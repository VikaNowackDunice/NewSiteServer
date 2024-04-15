import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateContentDto } from '../dto/create-content.dto';
import { ContentService } from './content.service';

@Controller()
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  getAllContent() {
    return this.contentService.getAllContent();
  }

  @Get('/:id')
  getOneContent(@Param('id') id: number) {
    return this.contentService.getOneContent(id);
  }

  @Post()
  createContent(@Body() contentDto: CreateContentDto) {
    return this.contentService.createContent(contentDto);
  }

  @Put('/:id')
  updateContentOne(
    @Param('id') id: number,
    @Body() contentDto: CreateContentDto,
  ) {
    return this.contentService.updateContentOne(contentDto, id);
  }

  @Delete('/:id')
  deleteOneContent(@Param('id') id: number) {
    return this.contentService.deleteOneContent(id);
  }
}
