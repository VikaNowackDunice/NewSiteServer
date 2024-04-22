import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from '../model/post.model';
import { CreatPostDto } from '../dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly contentRepository: typeof Post,
  ) {}

  async getAllContent(): Promise<Post[]> {
    try {
      const getAllContent = await this.contentRepository.findAll();
      return getAllContent;
    } catch (error) {
      throw new NotFoundException('Content not found');
    }
  }
  async getOneContent(id: number): Promise<Post> {
    try {
      const content = await this.contentRepository.findOne({
        where: {
          id,
        },
      });
      return content;
    } catch {
      throw new NotFoundException('Post not found');
    }
  }

  async createContent(postDto: CreatPostDto): Promise<Post> {
    try {
      const content = await this.contentRepository.create(postDto);
      return content;
    } catch {
      throw new NotFoundException('Failed to create post');
    }
  }

  async updateContentOne(postDto: CreatPostDto, id: number): Promise<Post> {
    try {
      const [updateContent] = await this.contentRepository.update(
        { content: postDto.text, theme: postDto.theme },
        { where: { id } },
      );
      if (updateContent === 0) {
        throw new NotFoundException(`Post with is ${id} was not found`);
      }
      return updateContent[0];
    } catch (error) {
      throw new NotFoundException(`Post item was not ${id}`);
    }
  }

  async deleteOneContent(id: number): Promise<string> {
    try {
      const deleteContent = await this.contentRepository.destroy({
        where: {
          id,
        },
      });

      if (deleteContent === 0) {
        throw new NotFoundException(`Content with is ${id} was not found`);
      }
      return `Content with id ${id} was successfully deleted`;
    } catch (error) {
      throw new NotFoundException('Content was not deleted');
    }
  }
}
