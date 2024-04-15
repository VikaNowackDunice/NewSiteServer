import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

import { AuthorCreate } from '../types/author';
import { Content } from './content.model';

@Table({ tableName: 'NewsAuthor' })
export class Author extends Model<Author, AuthorCreate> {
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

  @HasMany(() => Content)
  content: Content[];
}
