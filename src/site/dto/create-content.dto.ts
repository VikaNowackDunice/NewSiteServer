import { IsInstance, IsNumber, IsString } from 'class-validator';

export class CreateContentDto {
  @IsNumber()
  id: number;

  @IsString()
  text: string;

  @IsString()
  header: string;

  @IsInstance(Buffer)
  image: Buffer;
}
