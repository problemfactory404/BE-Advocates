import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    first_name: string;

    @IsString()
    // @IsNotEmpty()
    last_name: string;

    @IsString()
    // @IsNotEmpty()
    role: string;

    @IsString()
    // @IsNotEmpty()
    address: string;

    @Optional()
    @IsString()
    // @IsNotEmpty()
    identity_no: string;

    @Optional()
    @IsString()
    // @IsNotEmpty()
    vehicle_no: string;
}