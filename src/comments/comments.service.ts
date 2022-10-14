
import {
    Injectable,
} from "@nestjs/common";
import {
    InjectRepository,
} from "@nestjs/typeorm";

import { Repository, FindOptionsWhere } from "typeorm";

import { Comment } from "./entities/comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";


@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentsRepository: Repository<Comment>
    ) { }


    create(createCommentDto: CreateCommentDto): Promise<Comment> {
        const comment = this.commentsRepository.create(createCommentDto);
        return this.commentsRepository.save(comment);
    }


    findAllByUserId(fields: FindOptionsWhere<Comment>): Promise<Comment[]> {
        return this.commentsRepository.find({ where: fields });
    }
}