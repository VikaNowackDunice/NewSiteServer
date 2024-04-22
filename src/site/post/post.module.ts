import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { Post } from './post.model';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([Post])],
})
export class PostModule {}
