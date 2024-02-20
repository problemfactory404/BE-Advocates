import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpResponse } from 'src/httpResponse';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SIGN_IN_SUCCESS, USER_ALREADY_CREATED, USER_NOT_FOUND, USER_PASSWORD_INCORRECT } from 'src/utils/constant';
import { SignupDto } from './dtos/signUp.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
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
}
