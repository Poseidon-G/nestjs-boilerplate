import {
    Resolver,
    Query,
    Args,
    ResolveField,
    Parent,
} from "@nestjs/graphql"
import { Inject } from '@nestjs/common';
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CommentsService } from "src/comments/comments.service";
import { Comment } from "src/comments/entities/comment.entity";


@Resolver()
export class UsersResolver {
    constructor(
        private readonly usersService: UsersService,
        // private readonly commentsService: CommentsService,
    ) { }

    @ResolveField('comments')
    async comments(@Parent() user: User) {
        console.log("user XXXXXXX", user);
        // const { id } = user;
        // return this.commentsService.findAllByUserId({ userId: id } as any);
    }

    @Query()
    async getDetail(@Args("id") id: number) {
        return this.usersService.findOne({ id });
    }

    @Query()
    getUsers(@Args("page") page: number, @Args("size") size: number) {
        return this.usersService.findAll(page, size, "");
    }
}