import { IsNumber, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  text: string;

  @IsNumber()
  id: number;
}
