import {
    Resolver,
    Query,
    Args,
    ResolveField,
    Parent,
} from "@nestjs/graphql"

import { CommentsService } from "../comments/comments.service";
import { User } from "src/users/entities/user.entity";

@Resolver()
export class CommentsResolver {
    constructor(
        private readonly commentsService: CommentsService,
    ) { }

    @Query(returns => [Comment])
    getCommentsByUserId(@Args("userId") userId: number) {
        return this.commentsService.findAllByUserId({ userId } as any);
    }
}