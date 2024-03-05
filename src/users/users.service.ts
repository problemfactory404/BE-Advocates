import { Injectable, NotFoundException } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpResponse } from 'src/httpResponse';
import { DELETE_SUCCESS, OTP_NOT_VALID, OTP_VERIFY, PASSWORD_CHANGED, SIGN_OUT_SUCCESS, UPDATE_SUCCESS, USER_CREATED, USER_NOT_FOUND, USER_PASSWORD_INCORRECT } from 'src/utils/constant';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { encryptPassword } from 'src/utils/encryptPassword';
import { UpdateUserDto } from './dtos/updateUser.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private httpResponse: HttpResponse,
  ) { }
  // async create(createUserDto: CreateUserDto){
  //     const user=User.create(createUserDto);
  // }


  async create(body: CreateUserDto) {
    try {
      const user = this.userRepository.create(body);
      const userInfo = await this.userRepository.save(user);
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

  async getAll(page: number, pageSize: number, orderBy: string, direction: string) {
    try {
      let order = {};
      if(orderBy && direction){
        order = { [orderBy]: direction };
      }else{
        order = { ["created_at"]: 'DESC' };
      }
      const userList = await this.userRepository.find({order});
      const customerList = userList.filter(user => user.role === 'subadmin');
      console.log("customerList : ",customerList);
      // Apply pagination
      const totalRecords = customerList.length;
      const totalPages = Math.ceil(totalRecords / pageSize);
      const startIndex = (page) * pageSize;
      const endIndex = startIndex + pageSize;
      console.log("totalRecords : ",totalRecords," ||  totalPages : ",totalPages," ||  startIndex : ",startIndex," ||  endIndex : ",endIndex);
      const paginatedUserList = customerList.slice(startIndex, endIndex);
      console.log("paginatedUserList : ",paginatedUserList);
      return this.httpResponse.success({
        users: paginatedUserList,
        page,
        pageSize,
        totalRecords,
        totalPages
      }, "List Loaded Successfully");
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async update(id: number, body: UpdateUserDto) {
    try {
      const user = await this.userRepository.update(id, body);
      return this.httpResponse.success(user, UPDATE_SUCCESS);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }

  async delete(id: number) {
    try {
      const result = await this.userRepository.delete(id);
      if (result.affected === 0) {
        return this.httpResponse.badRequest({}, USER_NOT_FOUND);
      }
      return this.httpResponse.success(null, DELETE_SUCCESS);
    } catch (error) {
      return this.httpResponse.serverError({}, error.message);
    }
  }
}
