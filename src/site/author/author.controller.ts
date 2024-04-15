import {
  Controller,
  Post,
  Body,
  UsePipes,
  Get,
  Request,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

import { CreateAuthorDto, LoginAuthorDto } from '../dto/create-author.dto';
import { AuthService } from './auth.service';
import { Author } from '../model/author.model';
import { JwtAuthorGuard } from '../guards/jwt.guard';

@Controller('author')
export class AuthorController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: CreateAuthorDto) {
    return this.authService.createAuthor(dto);
  }

  @UseGuards(JwtAuthorGuard)
  @Post('login')
  login(@Body() dto: LoginAuthorDto, @Req() request) {
    console.log('token4');
    return this.authService.login(request.dto);
  }

  @UseGuards(JwtAuthorGuard)
  @Get('whoami')
  verify(@Request() req: Request & { author: Author }) {
    req.author;
  }

  @UseGuards(JwtAuthorGuard)
  @Patch()
  updateAuth(@Body() dto: CreateAuthorDto, @Req() request) {
    const author = request.author;
    return this.authService.update(author.image, dto);
  }
}
