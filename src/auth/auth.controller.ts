import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post } from '@nestjs/common'; import { SigninDto } from './dtos/signIn.dto';
import { SignupDto } from './dtos/signUp.dto';
import { CreateUserDto } from 'src/users/dtos/createUser.dto';

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
}
