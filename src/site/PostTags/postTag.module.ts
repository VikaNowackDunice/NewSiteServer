import { Module } from '@nestjs/common';
import { PostTagsService } from './postTag.service';
import { PostTagsController } from './postTag.controller';

@Module({
  imports: [],
  providers: [PostTagsService],
  controllers: [PostTagsController],
})
export class PostTag {}
