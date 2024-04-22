import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreatPostDto } from '../dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly posttService: PostService) {}

  @Get()
  getAllContent() {
    return this.posttService.getAllContent();
  }

  @Get('/:id')
  getOneContent(@Param('id') id: number) {
    return this.posttService.getOneContent(id);
  }

  @Post()
  createContent(@Body() postDto: CreatPostDto) {
    return this.posttService.createContent(postDto);
  }

  @Put('/:id')
  updateContentOne(@Param('id') id: number, @Body() postDto: CreatPostDto) {
    return this.posttService.updateContentOne(postDto, id);
  }

  @Delete('/:id')
  deleteOneContent(@Param('id') id: number) {
    return this.posttService.deleteOneContent(id);
  }
}
