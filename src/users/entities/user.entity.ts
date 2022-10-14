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

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @Column({ nullable: true })
    age: number;

    @Column({ nullable: true })
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

    
}