import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';

import { ContentCreate } from '../types/post';
import { User } from '../author/user.model';
import { Tag } from './tag.model';
import { PostTag } from './post-tag.model';

@Table({ tableName: 'Post' })
export class Post extends Model<Post, ContentCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  theme: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: false })
  img: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => PostTag)
  tags: (Tag & { PostTag: PostTag })[];

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;
}
