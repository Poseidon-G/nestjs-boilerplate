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
} from 'typeorm';

import * as bcrypt from 'bcrypt';

import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Field()
  @Index({ unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @Field()
  @ApiProperty({ required: false, nullable: true })
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column()
  @Field()
  @ApiProperty()
  role: string;

  @Column({ nullable: true })
  @Field()
  @ApiProperty({ required: false, nullable: true })
  age: number;

  @Column({ nullable: true })
  @Field()
  @ApiProperty({ required: false, nullable: true })
  address: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn()
  @ApiProperty()
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
}
