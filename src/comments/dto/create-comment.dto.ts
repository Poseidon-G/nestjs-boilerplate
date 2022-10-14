import { Transform } from 'class-transformer'

import { IsString, IsNumber } from 'class-validator';


export class CreateCommentDto {
    @IsString()
    content: string;

    @IsNumber()
    userId: number;
}
