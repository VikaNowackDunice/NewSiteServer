import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostTag } from './post-tag.model';
import { CreatePostTagDto } from '../dto/create-tagPost.dto';

@Injectable()
export class PostTagsService {
  constructor(
    @InjectModel(PostTag) private readonly postTagsModel: typeof PostTag,
  ) {}

  async createСonnection(dto: CreatePostTagDto): Promise<PostTag> {
    try {
      const connection = await this.postTagsModel.create(dto);
      return connection;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
