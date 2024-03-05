import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dtos/createUser.dto';
import { SignupDto } from 'src/auth/dtos/signUp.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { ResetPasswordDto } from './dtos/resetPassword.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

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

  @Get()
  getAll(@Query('page') page: number, @Query('pageSize') pageSize: number, @Query('orderBy') orderBy: string, @Query('direction') direction: string,){
    return this.usersService.getAll(page,pageSize,orderBy,direction)
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @Delete('/:id')
  deleteMember(@Param('id') id: number) {
    return this.usersService.delete(id);
  }
}
