import { Controller, Post } from '@nestjs/common';
import { PostTagsService } from './postTag.service';
import { CreatePostTagDto } from '../dto/create-tagPost.dto';

@Controller('/PostTag')
export class PostTagsController {
  constructor(private readonly postTagService: PostTagsService) {}

  @Post()
  createСonnection(dto: CreatePostTagDto) {
    return this.postTagService.createСonnection(dto);
  }
}
