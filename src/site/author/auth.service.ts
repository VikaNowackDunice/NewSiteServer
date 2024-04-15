import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { Author } from '../model/author.model';
import { CreateAuthorDto, LoginAuthorDto } from '../dto/create-author.dto';
import { JwtAuthService } from './jwt/jwt.strategy';
import { AppError } from 'src/common/errors';
import Op from 'sequelize/types/operators';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Author)
    private readonly authorRepository: typeof Author,
    private readonly jwtauthService: JwtAuthService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async generateToken(id: number): Promise<string> {
    return await this.jwtService.signAsync({ id });
  }

  async createAuthor({
    login,
    email,
    password,
  }: LoginAuthorDto): Promise<{ login: string; token: string }> {
    const existingAuthor = await this.authorRepository.findOne({
      where: { [Op.or]: [{ login }, { email }] },
    });
    if (existingAuthor) {
      throw new NotFoundException(' The author already exists');
    }
    const hashedPassword = await this.hashPassword(password);
    const newAuthor = {
      login,
      email,
      password: hashedPassword,
    };
    const author = await this.authorRepository.create(newAuthor);
    const token = await this.generateToken(author.id);
    return { login, token };
  }

  async login(dto: LoginAuthorDto): Promise<LoginAuthorDto> {
    const exisAuthor = await this.authorRepository.findOne({
      where: { email: dto.email },
    });
    if (!exisAuthor) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      exisAuthor.password,
    );
    if (!validatePassword)
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    const authorData = {
      id: exisAuthor.id,
      email: exisAuthor.email,
      login: exisAuthor.login,
      image: exisAuthor.image,
    };
    const token = await this.generateToken(authorData.id);
    delete authorData['password'];
    return { ...exisAuthor, token };
  }

  async validateAuthor(username: string, pass: string): Promise<any> {
    const author = await this.authorRepository.findOne({
      where: { login: username },
    });
    if (!author) throw new UnauthorizedException('Unknown login');
    const validatePassword = await bcrypt.compare(pass, author.password);
    if (!validatePassword) throw new UnauthorizedException('Invalid password');
    return author.dataValues;
  }

  async validateToken(id: number): Promise<Author> {
    try {
      const author = await this.authorRepository.findByPk(id, {
        attributes: ['login', 'email', 'createdAt', 'updatedAt'],
      });
      if (!author) throw new UnauthorizedException('Invalid author');
      return author;
    } catch (error) {
      throw new NotFoundException('User not found or password does not match');
    }
  }

  async update(image: string, dto: CreateAuthorDto) {
    return this.authorRepository.update(dto, { where: { image } });
  }
}
