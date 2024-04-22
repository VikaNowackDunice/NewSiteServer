import { IsNumber, IsString } from 'class-validator';

export class CreatPostDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsString()
  theme: string;

  @IsString()
  img: string;
}
