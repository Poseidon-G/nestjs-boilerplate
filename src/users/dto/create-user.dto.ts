import { Transform } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsInt, MinLength, MaxLength, IsOptional } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @ApiProperty()
    username: string;

    @IsEmail()
    @ApiProperty({ required: false, nullable: true })
    email: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    role: string;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    @ApiProperty({ required: false, nullable: true })
    age: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, nullable: true })
    address: string;
}
