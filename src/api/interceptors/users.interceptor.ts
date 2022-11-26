import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import User from '../../users/entities/user.entity';

@Injectable()
export default class UsersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((user: User) => {
        if ('password' in user) {
          const { password, ...strippedUser } = user;
          return strippedUser;
        }
        return user;
      }),
    );
  }
}
