import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IAuthRequest } from 'src/shared';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: IAuthRequest = context.switchToHttp().getRequest();
    return true; // Authorized
    const userRole = request.user.role;

    // Check if the user's role is in the list of allowed roles
    if (this.allowedRoles.includes(userRole)) {
      return true; // Authorized
    }

    return false; // Not authorized
  }
}
