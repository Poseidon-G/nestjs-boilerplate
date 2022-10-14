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
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from "./users.service";


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() query: any){
        let page: number = query.page || 1;
        let size: number = query.size || 10;
        let filter: string = query.filter;
        return this.usersService.findAll(page, size, filter);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    findOne(@Param("id") id: number) {
        return this.usersService.findOne({id});
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