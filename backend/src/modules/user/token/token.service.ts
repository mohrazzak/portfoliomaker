import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPurpose } from '@prisma/client';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { appConfig } from 'src/core';
import { I18nTranslations } from 'src/generated';
import { Role } from 'src/generated/zod/enums';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ITokenPayload } from 'src/shared';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
    private readonly prismaService: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async generateConfirmationToken(
    userId: string,
    role: Role,
    purpose: TokenPurpose,
  ) {
    const token = await this.signToken(
      {
        id: userId,
        role,
      },
      this.configService.jwt.confirmDuration,
    );

    await this.createToken(token, purpose);

    return token;
  }

  private async signToken(tokenPayload: ITokenPayload, duration: string) {
    const generatedToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: duration,
    });

    return generatedToken;
  }

  async createToken(token: string, purpose: TokenPurpose) {
    return await this.prismaService.token.create({
      data: {
        token,
        purpose,
      },
    });
  }

  async verifyConfirmationToken(token: string, purpose: TokenPurpose) {
    const verifiedToken = await this.verifyToken(token);

    const foundToken = await this.prismaService.token.delete({
      where: { token, purpose },
      select: { id: true },
    });

    if (!foundToken)
      throw new BadRequestException(
        this.i18n.t('auth.errors.invalidSignupCode', {
          // todo
          lang: I18nContext.current()!.lang,
        }),
      );

    return verifiedToken;
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async generateSignInToken(payload: ITokenPayload) {
    const generatedToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.jwt.loginDuration,
    });

    return generatedToken;
  }

  async deleteToken(id: number) {
    // seperate
    setImmediate(async () => {
      await this.prismaService.token.delete({ where: { id } });
    });
  }
}
