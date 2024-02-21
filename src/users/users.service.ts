import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/httpResponse';
import { SIGN_OUT_SUCCESS, USER_CREATED } from 'src/utils/constant';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';

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
      console.log("User :====: ", user,"   Body :====: ", body);
      const userInfo = await this.userRepository.save(user);
      console.log("User Info  ::::: ",userInfo);
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

  async updateIsLoggedin(userId: number){
    await this.userRepository.update(userId,{isLoggedIn: true});
  }

  async signOut(userId: number) {
    try {
      this.userRepository.update(userId, { isLoggedIn: false });
      return this.httpResponse.success({}, SIGN_OUT_SUCCESS);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }
}
