import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post } from './post.model';
import { CreatPostDto } from '../dto/create-post.dto';
import { Tag } from '../tag/tag.model';
import { User } from '../author/user.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly contentRepository: typeof Post,
  ) {}

  async getAllContent(): Promise<Post[]> {
    try {
      const getAllContent = await this.contentRepository.findAll({
        order: [['createdAt', 'DECS']],
        include: [
          {
            model: User,
            attributes: ['id', 'login'],
          },
          {
            model: Tag,
            attributes: ['id', 'name'],
            through: { attributes: [] },
          },
        ],
      });
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
      console.log(postDto);
      return content;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async updateContentOne(postDto: CreatPostDto, id: number): Promise<Post> {
    try {
      const [updateContent] = await this.contentRepository.update(
        { content: postDto.content, theme: postDto.theme },
        { where: { id } },
      );
      if (updateContent === 0) {
        throw new NotFoundException(`Post with is ${id} was not found`);
      }
      return updateContent[0];
    } catch (error) {
      throw new NotFoundException(error.message);
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
      throw new NotFoundException(error.message);
    }
  }
}
