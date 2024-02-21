import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class VerfiyAccountDto {
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @IsEmail()
  @IsOptional()
  email: string;
}
