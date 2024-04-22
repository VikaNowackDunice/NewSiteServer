import { IsNumber, IsString } from 'class-validator';

export class CreatePostTagDto {
  @IsNumber()
  postId: number;

  @IsString()
  tagId: number;
}
