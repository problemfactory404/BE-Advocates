import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/httpResponse';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_CHANGED, SIGN_IN_SUCCESS, USER_ALREADY_CREATED, USER_NOT_FOUND, USER_PASSWORD_INCORRECT } from 'src/utils/constant';
import { SignupDto } from './dtos/signUp.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dtos/changePassword.dto';
import { encryptPassword } from 'src/utils/encryptPassword';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpResponse: HttpResponse,
  ) { }

  async signIn(
    email: string,
    password: string
  ) {
    try {
      const user = await this.usersService.findEmail(email);
      if (!user) {
        return this.httpResponse.notFound({}, USER_NOT_FOUND);
      }
      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      if (storedHash !== hash.toString('hex')) {
        return this.httpResponse.badRequest({}, USER_PASSWORD_INCORRECT);
      }
      await this.usersService.updateIsLoggedin(
        user.id
      );
      const payload = { sub: user.id, email: user.email };
      return this.httpResponse.success(
        {
          user: user,
          access_token: await this.jwtService.signAsync(payload),
        },
        SIGN_IN_SUCCESS,
      );
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async signUp(body: CreateUserDto) {
    const user = await this.usersService.findEmail(body.email);
    if (user) {
      return this.httpResponse.badRequest({}, USER_ALREADY_CREATED);
    }

    // Hash the user's password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    body.password = result;
    return await this.usersService.create(body);
  }

  signOut(userId: number) {
    return this.usersService.signOut(userId);
  }

  verifyOtp(phoneNumber: string, email: string, otp: string) {
    // Verify phone OTP if phone number is provided; otherwise, verify email OTP
    if (phoneNumber) {
      return this.usersService.verifyPhoneOtp(phoneNumber, otp);
    }
    return this.usersService.verifyEmailOtp(email, otp);
  }

  async forgotPassword(phoneNumber: string, email: string) {
    if (phoneNumber) {
      let user = await this.usersService.findPhone(phoneNumber);
      if (!user) {
        return this.httpResponse.notFound({}, USER_NOT_FOUND);
      }
      return this.httpResponse.success({ id: user.id });
    }
    let user = await this.usersService.findEmail(email);
    if (!user) {
      return this.httpResponse.notFound({}, USER_NOT_FOUND);
    }
    return this.httpResponse.success({ id: user.id });
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return this.httpResponse.badRequest({}, USER_NOT_FOUND);
    }
    const password = await encryptPassword(newPassword);
    this.userRepository.update(id, { password });
    return this.httpResponse.success(user, PASSWORD_CHANGED);
  }
}
