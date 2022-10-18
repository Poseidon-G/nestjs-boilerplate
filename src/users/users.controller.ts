import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { ERROR_CODE } from 'src/constants/errorCode';
import { CustomException } from 'src/pipe/custom-exception';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiResponseCustom } from 'src/decorator/swagger.decorator';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: [User] })
  findAll(@Query() query: any) {
    const page: number = query.page || 1;
    const size: number = query.size || 10;
    return this.usersService.findAll(page, size);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({ type: User })
  @ApiResponseCustom(ERROR_CODE.USER_NOT_FOUND)
  @ApiResponseCustom(ERROR_CODE.INTERNAL_SERVER_ERROR)
  async findOne(@Param('id') id: number) {
    try {
      const user = await this.usersService.findOne({ id });

      if (!user) {
        throw ERROR_CODE.USER_NOT_FOUND;
      }

      return user;
    } catch (error) {
      if (error.statusCode) {
        throw new CustomException(error);
      } else {
        throw new CustomException(ERROR_CODE.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: User })
  create(@Body() createProfileDto: CreateUserDto) {
    return this.usersService.create(createProfileDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
