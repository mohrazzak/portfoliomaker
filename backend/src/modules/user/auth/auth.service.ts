import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITokenPayload } from 'src/shared';
import bcrypt from 'bcryptjs';
import { UserEntity } from '../entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { MailerService } from 'src/modules/user/auth/mailer/mailer.service';
import { UserService } from '../user.service';
import { I18nTranslations } from 'src/generated';
import { Role } from 'src/generated/zod/enums';
import { appConfig } from 'src/core';
import {
  ConfirmSignupDto,
  ResetUserPasswordByPasswordDto,
  SigninDto,
  SignupDto,
} from './dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { UserEntityMapper } from '../services/entity-mapper.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class userAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
    @Inject(appConfig.KEY)
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly userEntityMapper: UserEntityMapper,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: SignupDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.userService.create({
      email: dto.email,
      password: hashedPassword,
    });

    const token = await this.tokenService.generateConfirmationToken(
      user.id,
      Role.USER,
      'SIGNUP',
    );

    await this.mailerService.sendSignUpEmail(dto.email, token);

    return this.userService.findPublicByIdOrThrow(user.id);
  }

  async confirmSignup(dto: ConfirmSignupDto): Promise<UserEntity> {
    const verifiedToken = await this.tokenService.verifyConfirmationToken(
      dto.token,
      'SIGNUP',
    );

    await this.activate(verifiedToken.id);

    return this.userService.findPublicByIdOrThrow(verifiedToken.id);
  }

  async signin(dto: SigninDto): Promise<{ token: string; user: UserEntity }> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );
    }

    const passwordsMatch = await this.comparePasswords(
      dto.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );
    }

    const userEntity = this.userEntityMapper.modelToEntity(user);

    const tokenPayload: ITokenPayload = {
      id: userEntity.id,
      role: Role.USER,
    };

    const token = await this.tokenService.generateSignInToken(tokenPayload);

    await this.updateLastLoginTime(user.id);

    return { user: userEntity, token };
  }

  async bypassSignin(userId: string) {
    const tokenPayload: ITokenPayload = {
      id: userId,
      role: Role.USER,
    };

    const token = await this.tokenService.generateSignInToken(tokenPayload);

    await this.updateLastLoginTime(userId);

    return token;
  }

  private async updateLastLoginTime(userId: string) {
    setImmediate(async () => {
      await this.prismaService.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
        select: { id: true },
      });
    });
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  async activate(userId: string) {
    return await this.prismaService.user.update({
      where: { id: userId, isActive: false },
      data: { isActive: true },
      select: { id: true },
    });
  }

  async changePassword(
    userId: string,
    hashedPassword: string,
    newPassword: string,
  ) {
    const passwordSame = await this.comparePasswords(
      newPassword,
      hashedPassword,
    );

    if (passwordSame)
      throw new BadRequestException(
        this.i18n.t('auth.errors.changePasswordToNew', {
          lang: I18nContext.current()!.lang,
        }),
      );

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await this.prismaService.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
      select: { id: true },
    });
  }

  async resetPasswordByPassword(
    userId: string,
    dto: ResetUserPasswordByPasswordDto,
  ) {
    const foundUser = await this.userService.findByIdOrThrow(userId);

    const passwordsMatch = await this.comparePasswords(
      dto.password,
      foundUser.password,
    );

    if (!passwordsMatch)
      throw new BadRequestException(
        this.i18n.t('auth.errors.wrongCredentials', {
          lang: I18nContext.current()!.lang,
        }),
      );

    await this.changePassword(
      foundUser.id,
      foundUser.password,
      dto.newPassword,
    );

    return this.userEntityMapper.modelToEntity(foundUser);
  }

  async resetPasswordByEmail(email: string): Promise<void> {
    const user = await this.userService.findIdByEmailOrThrow(email);

    const token = await this.tokenService.generateConfirmationToken(
      user.id,
      Role.USER,
      'PASSWORD_RESET',
    );

    await this.mailerService.sendResetPasswordEmail(email, token);
  }

  async confirmResetPasswordByEmail(resetToken: string, newPassword: string) {
    const verifiedToken = await this.tokenService.verifyConfirmationToken(
      resetToken,
      'PASSWORD_RESET',
    );

    const foundUser = await this.prismaService.user.findUniqueOrThrow({
      where: { id: verifiedToken.id },
      select: { id: true, password: true },
    });

    await this.changePassword(foundUser.id, foundUser.password, newPassword);
  }

  // async logout(userId: string) {
  //   await this.cacheService.deleteKey(userId.toString());
  // }
}
