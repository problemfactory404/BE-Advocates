// import { Type } from "class-transformer";
// import { IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

// export class UserDto {
//     @IsString()
//     @IsNotEmpty()
//     name: string;

//     @IsString()
//     @IsNotEmpty()
//     phoneNumber: string;

//     @IsEmail()
//     @IsNotEmpty()
//     email: string;

//     @IsString()
//     @IsNotEmpty()
//     password: string;
// }
// export class SignupDto {
//     @ValidateNested()
//     @Type(() => UserDto)
//     user: UserDto;
// }





import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;
}

export class SignupDto {
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}
