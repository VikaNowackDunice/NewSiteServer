import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthorGuard extends AuthGuard('jwt') {
  canActive(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequestauthor(err, author) {
    if (err || !author) {
      throw err || new UnauthorizedException();
    }
    return author;
  }
}
