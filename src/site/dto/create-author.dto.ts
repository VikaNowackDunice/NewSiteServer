import { IsNumber, IsString, IsEmail } from 'class-validator';

export class CreateAuthorDto {
  @IsNumber()
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}

export class LoginAuthorDto {
  @IsNumber()
  id?: number;

  @IsString()
  login: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  token?: string;
}
