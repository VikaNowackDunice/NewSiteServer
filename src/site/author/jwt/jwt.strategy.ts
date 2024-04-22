import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: NestJwtService,
    private config: ConfigService,
  ) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.sign(payload, {
      secret: this.config.get('SECRET'),
    });
  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  // async generateJwtToken(author) {
  //   const payload = { author };
  //   return this.jwtService.sign(payload, {
  //     secret: this.config.get('SECRET'),
  //     expiresIn: this.config.get('expire_jwt'),
  //   });
  // }
}
