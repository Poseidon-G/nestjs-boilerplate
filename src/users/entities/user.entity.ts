import {
    AfterLoad,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    Index,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
@ObjectType()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Field()
    @Index({ unique: true })
    username: string;

    @Column()
    @Field()
    email: string;

    @Column()
    password: string;

    @Column()
    @Field()
    role: string;

    @Column({ nullable: true })
    @Field()
    age: number;

    @Column({ nullable: true })
    @Field()
    address: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    public previousPassword: string;
    @AfterLoad()
    loadPreviousPassword() {
        this.previousPassword = this.password;
    }

    @BeforeInsert()
    @BeforeUpdate()
    async setPassword() {
        if (this.previousPassword !== this.password && this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    @Field(type => [Comment])
    comments: Comment[];
}