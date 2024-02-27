import { Body, Controller, Param, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common'; import { SigninDto } from './dtos/signIn.dto';
import { SignupDto } from './dtos/signUp.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';
import { SignOutDto } from './dtos/signOut.dto';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { VerfiyAccountDto } from './dtos/verifyAccount.dto';
import { ChangePasswordDto } from './dtos/changePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  async signIn(@Body() body: SigninDto) {
    return this.authService.signIn(
      body.email,
      body.password
    );
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Post('/signout')
  signOut(@Body() body: SignOutDto) {
    return this.authService.signOut(body.userId);
  }

  @Post('/forgotPassword')
  forgotPassword(@Body() body: VerfiyAccountDto) {
    return this.authService.forgotPassword(body.phoneNumber, body.email);
  }

  @Post('/verifyOtp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    return this.authService.verifyOtp(body.phoneNumber, body.email, body.otp);
  }

  @Patch('/changePassword/:id')
  changePassword(@Param('id') id: number,@Body() body: ChangePasswordDto) {
    return this.authService.changePassword(id, body.newPassword);
  }
}
