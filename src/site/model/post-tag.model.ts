import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';

import { ContentTagCreate } from '../types/tags-post';
import { Post } from './post.model';
import { Tag } from './tag.model';

@Table({ tableName: 'post_tag' })
export class PostTag extends Model<PostTag, ContentTagCreate> {
  @ForeignKey(() => Post)
  postId: number;

  @ForeignKey(() => Tag)
  tagId: number;

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
