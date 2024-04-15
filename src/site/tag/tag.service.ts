import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Tag } from '../model/tag.model';
import { CreateTagDto } from '../dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag) private readonly tagRepository: typeof Tag) {}
  async getAllTags(): Promise<Tag[]> {
    try {
      const tag = await this.tagRepository.findAll();
      return tag;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async getOneTag(id: number): Promise<Tag> {
    try {
      const tag = await this.tagRepository.findOne({
        where: { id },
      });
      return tag;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async createTag(tagDto: CreateTagDto): Promise<Tag> {
    try {
      const tag = await this.tagRepository.create(tagDto);
      return tag;
    } catch (error) {
      throw new NotFoundException('Tag not found');
    }
  }

  async updateTag(tagDto: CreateTagDto, id: number): Promise<Tag> {
    try {
      const [tag] = await this.tagRepository.update(
        { name: tagDto.text },
        { where: { id } },
      );
      if (tag === 0) {
        throw new NotFoundException(`tag with id ${id} was not found`);
      }
      return tag[0];
    } catch (error) {
      throw new NotFoundException(`Tag was not ${id}`);
    }
  }

  async deleteTag(id: number): Promise<string> {
    const deleteTag = await this.tagRepository.destroy({
      where: {
        id,
      },
    });
    if (deleteTag === 0) {
      throw new NotFoundException(`Tag with id ${id} was not found`);
    }
    return `Tag with id ${id} was successfully deleted`;
  }
}
