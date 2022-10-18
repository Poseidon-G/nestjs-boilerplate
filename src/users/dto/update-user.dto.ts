import { Transform } from 'class-transformer';

import {
  IsEmail,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsOptional()
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
