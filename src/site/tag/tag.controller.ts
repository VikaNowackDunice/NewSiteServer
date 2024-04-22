import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  getAllTags() {
    return this.tagService.getAllTags();
  }

  @Get('/:id')
  getOneTag(@Param('id') id: number) {
    return this.tagService.getOneTag(id);
  }

  @Post()
  createTag(@Body() tagDto: CreateTagDto) {
    return this.tagService.createTag(tagDto);
  }

  @Put('/:id')
  updateContent(@Param('id') id: number, @Body() tagDto: CreateTagDto) {
    return this.tagService.updateTag(tagDto, id);
  }

  @Delete('/:id')
  daleteTag(@Param('id') id: number) {
    return this.tagService.deleteTag(id);
  }
}
