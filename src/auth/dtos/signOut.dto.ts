import { IsNumber } from "class-validator";

export class SignOutDto {
    @IsNumber()
    userId: number;
}