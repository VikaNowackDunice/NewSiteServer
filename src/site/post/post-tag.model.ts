import {
  Table,
  Model,
  ForeignKey,
  Column,
  DataType,
} from 'sequelize-typescript';
import { Post } from './post.model';
import { ContentTagCreate } from '../types/tags-post';
import { Tag } from './tag.model';

@Table({ tableName: 'PostTag' })
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
