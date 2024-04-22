import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';

import { User } from '../model/user.model';
import { CreateAuthorDto, LoginAuthorDto } from '../dto/create-author.dto';
import { JwtAuthService } from './jwt/jwt.strategy';
import { AppError } from 'src/common/errors';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly authorRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly jwtauthService: JwtAuthService,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10);
  }

  async createAuthor({
    login,
    email,
    password,
  }: LoginAuthorDto): Promise<{ login: string; token: string }> {
    const existingAuthor = await this.authorRepository.findOne({
      where: { login, email },
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
    const token = await this.jwtauthService.sign(author.id);
    return { login, token };
  }

  async login(dto: LoginAuthorDto): Promise<string> {
    console.log(dto);
    const existAuthor = await this.authorRepository.findOne({
      where: { email: dto.email },
    });
    if (!existAuthor) throw new BadRequestException(AppError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(
      dto.password,
      existAuthor.password,
    );
    if (!validatePassword)
      throw new BadRequestException(AppError.USER_NOT_EXIST);
    const authorData = {
      id: existAuthor.id,
      email: existAuthor.email,
      login: existAuthor.login,
      image: existAuthor.image,
    };
    const token = await this.jwtauthService.sign(authorData);
    delete authorData['password'];
    return token;
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

  async validateToken(id: number): Promise<User> {
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
