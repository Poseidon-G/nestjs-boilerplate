import { Transform } from 'class-transformer'

import { IsEmail, IsString, IsInt, MinLength, MaxLength, IsOptional} from 'class-validator';


export class CreateUserDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;

    @IsString()
    role: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    age: number;

    @IsOptional()
    @IsString()
    address: string;
}
