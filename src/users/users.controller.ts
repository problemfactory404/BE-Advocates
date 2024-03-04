import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dtos/createUser.dto';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() signUpDto:CreateUserDto){
    this.usersService.create(signUpDto);
  }

  @Patch('/reset-password/:id')
  resetPassword(@Param('id') id: number, @Body() body: ResetPasswordDto) {
    return this.usersService.resetPassword(
      id,
      body.newPassword,
    );
  }
}
