import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Request } from 'express';
import { appConfig } from '../configs';
import { IDecodedToken, IAuthRequest } from 'src/shared';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: IAuthRequest = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const i18n = I18nContext.current<I18nTranslations>(context)!;

    if (!token) {
      throw new UnauthorizedException(i18n.translate('auth.errors.loginFirst'));
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync<IDecodedToken>(
        token,
        {
          secret: this.configService.jwt.loginDuration,
        },
      );

      if (!decodedToken) {
        throw new UnauthorizedException(
          i18n.translate('auth.errors.unauthorized'),
        );
      }

      return true;
    } catch (error: any) {
      const errorMessage =
        error.message || i18n.translate('auth.errors.unauthorized');

      throw new UnauthorizedException(errorMessage);
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(' ');

    return type === 'Bearer' ? token : undefined;
  }
}
