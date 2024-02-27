import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/httpResponse';
import { OTP_NOT_VALID, OTP_VERIFY, PASSWORD_CHANGED, SIGN_OUT_SUCCESS, USER_CREATED, USER_NOT_FOUND, USER_PASSWORD_INCORRECT } from 'src/utils/constant';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { encryptPassword } from 'src/utils/encryptPassword';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private httpResponse: HttpResponse,
  ) { }
  // async create(createUserDto: CreateUserDto){
  //     const user=User.create(createUserDto);
  // }


  async create(body: CreateUserDto) {
    try {
      const user = this.userRepository.create(body);
      console.log("User :====: ", user, "   Body :====: ", body);
      const userInfo = await this.userRepository.save(user);
      console.log("User Info  ::::: ", userInfo);
      return this.httpResponse.success(userInfo, USER_CREATED);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async findEmail(email: string) {
    return this.userRepository.findOneBy({
      email: email,
    });
  }

  async updateIsLoggedin(userId: number) {
    await this.userRepository.update(userId, { isLoggedIn: true });
  }

  async signOut(userId: number) {
    try {
      this.userRepository.update(userId, { isLoggedIn: false });
      return this.httpResponse.success({}, SIGN_OUT_SUCCESS);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async verifyPhoneOtp(phoneNumber: string, otp: string) {
    try {
      let user = await this.userRepository.findOneBy({ phoneNumber });
      console.log("Hello user service : ", user);

      if (!user) {
        return this.httpResponse.notFound({}, USER_NOT_FOUND);
      }
      //if (user.otp !== otp)
      if (otp == "1234") {
        return this.httpResponse.success(user, OTP_VERIFY);
      }
      return this.httpResponse.badRequest({}, OTP_NOT_VALID);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async verifyEmailOtp(email: string, otp: string) {
    try {
      let user = await this.findEmail(email);
      if (!user) {
        return this.httpResponse.notFound({}, USER_NOT_FOUND);
      }
      //if (user.otp !== otp)
      if (otp == "1234") {
        return this.httpResponse.success(user, OTP_VERIFY);
      }
      return this.httpResponse.badRequest({}, OTP_NOT_VALID);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  findPhone(phoneNumber: string) {
    return this.userRepository.findOneBy({
      phoneNumber: phoneNumber,
    });
  }

  async resetPassword(id: number, newPassword: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      return this.httpResponse.badRequest({}, USER_NOT_FOUND);
    }
    const password = await encryptPassword(newPassword);
    this.userRepository.update(id, { password });
    return this.httpResponse.success(user, PASSWORD_CHANGED);
  }
}
