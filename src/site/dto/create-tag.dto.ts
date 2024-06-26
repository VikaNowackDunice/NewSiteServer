import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;
}
