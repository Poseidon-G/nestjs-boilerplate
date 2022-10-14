import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
    imports: [forwardRef(() => CommentsModule), TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService, UsersResolver],
})
export class UsersModule { }