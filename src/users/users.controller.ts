import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Query,
    Delete,
    HttpCode,
    HttpStatus,
    Inject,
    HttpException,
} from "@nestjs/common";

import { ERROR_CODE } from "src/constants/errorCode";
import { CustomException } from "src/pipe/custom-exception";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() query: any) {
        let page: number = query.page || 1;
        let size: number = query.size || 10;
        let filter: string = query.filter;
        return this.usersService.findAll(page, size, filter);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async findOne(@Param("id") id: number) {
        try {
            const user = await this.usersService.findOne({ id });

            if (!user) {
                throw ERROR_CODE.USER_NOT_FOUND;
            }

            return user;
        }
        catch (error) {
            if (error.statusCode) {
                throw new CustomException(error);
            }
            else {
                throw new CustomException(ERROR_CODE.INTERNAL_SERVER_ERROR);
            }
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() createProfileDto: CreateUserDto) {
        return this.usersService.create(createProfileDto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    remove(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
}