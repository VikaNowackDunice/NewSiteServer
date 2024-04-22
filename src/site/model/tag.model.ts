import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';

import { TagCreate } from '../types/tag';
import { Post } from './post.model';
import { PostTag } from './post-tag.model';

@Table({ tableName: 'tag' })
export class Tag extends Model<Tag, TagCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @BelongsToMany(() => Post, () => PostTag)
  content: Post[];

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
