import {
    Module,
} from '@nestjs/common';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsResolver } from './comments.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    controllers: [CommentsController],
    providers: [CommentsService, CommentsResolver],
    exports: [CommentsService],
})

export class CommentsModule { }