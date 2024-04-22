import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { UserCreate } from '../types/user';
import { Post } from './post.model';

@Table({ tableName: 'NewsAuthor' })
export class User extends Model<User, UserCreate> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  image: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.DATE })
  createdAt;

  @Column({ type: DataType.DATE })
  updatedAt;

  @HasMany(() => Post)
  post: Post[];
}
