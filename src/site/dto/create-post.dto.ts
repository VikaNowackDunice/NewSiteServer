import { IsNumber, IsString } from 'class-validator';

export class CreatPostDto {
  @IsNumber()
  id: number;

  @IsString()
  content: string;

  @IsString()
  theme: string;

  @IsString()
  img: string;
}
