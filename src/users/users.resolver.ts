import {
    Resolver,
    Query,
    Args
} from "@nestjs/graphql"
import { UsersService } from "./users.service";

@Resolver()
export class UsersResolver {
    constructor(private readonly usersService: UsersService) { }

    @Query()
    getDetail(@Args("id") id: number) {
        return this.usersService.findOne({ id });
    }

    @Query()
    getUsers(@Args("page") page: number, @Args("size") size: number) {
        return this.usersService.findAll(page, size, "");
    }

}