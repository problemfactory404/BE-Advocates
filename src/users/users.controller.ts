import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dtos/createUser.dto';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // create(@Body() signUpDto:CreateUserDto){
  //   console.log("DTO : ",signUpDto);
  //   this.usersService.create(signUpDto);
  // }
}
