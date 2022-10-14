import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    findAll(page: number, size: number, filter: string): Promise<User[]> {
        return this.usersRepository.find({
            skip: (page - 1) * size,
            take: size,
        });
    }

    findOne(fields: FindOptionsWhere<User>): Promise<User> {
        return this.usersRepository.findOne({
            where: fields,
        });
    }

    update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.usersRepository.update(id, updateUserDto);
    }
}