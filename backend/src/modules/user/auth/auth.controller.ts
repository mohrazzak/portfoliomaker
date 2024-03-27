import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { I18nHeader } from 'src/core/decorators/api';
import { AppUserResponse, ReturnedUserResponse } from '../dto';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated';
import { Role } from 'src/generated/zod/enums';
import { AuthGuard, RoleGuard } from 'src/core';
import { IAuthRequest } from 'src/shared';
import { userAuthService } from './auth.service';
import {
  ConfirmSignupDto,
  SigninDto,
  SignupDto,
  AppUserSigninResponse,
  ReturnedUserSigninResponse,
  ConfirmResetUserPasswordByPasswordDto,
  ResetPasswordByEmailDto,
  ResetUserPasswordByPasswordDto,
} from './dto';
import {
  AppResponse,
  ReturnedResponse,
} from 'src/shared/interfaces/response.interface';

@Controller('auth')
@I18nHeader()
@ApiTags('auth')
export class userAuthController {
  constructor(private readonly authService: userAuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Create a new user account.',
    type: AppUserResponse,
  })
  async signup(
    @Body() dto: SignupDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserResponse> {
    const user = await this.authService.signup(dto);
    return {
      data: { user },
      message: i18n.t('auth.success.signup'),
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('signup/confirm')
  @ApiOkResponse({
    description: 'Complete the signup process by confirming the email address.',
    type: AppUserSigninResponse,
  })
  async confirmSignup(
    @Body() dto: ConfirmSignupDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserSigninResponse> {
    const user = await this.authService.confirmSignup(dto);
    const token = await this.authService.bypassSignin(user.id);
    return {
      data: {
        user,
        token,
      },
      message: i18n.t('auth.success.confirmSignup'),
      statusCode: HttpStatus.OK,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Authenticate and sign in as a user.',
    type: AppUserSigninResponse,
  })
  async signin(
    @Body() dto: SigninDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserSigninResponse> {
    const { token, user } = await this.authService.signin(dto);
    return {
      data: {
        user,
        token,
      },
      message: i18n.t('auth.success.signin'),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('reset-password/by-password')
  @ApiOkResponse({
    description:
      'Change the password for a user who knows their current password.',
    type: ReturnedUserResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.USER]))
  async resetPasswordByOldPassword(
    @Req() req: IAuthRequest,
    @Body() dto: ResetUserPasswordByPasswordDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.resetPasswordByPassword(req.user.id, dto);
    return {
      message: i18n.t('auth.success.resetPassword'),
      statusCode: 201,
    };
  }

  @Patch('reset-password/by-email')
  @ApiOkResponse({
    description:
      "Send a password reset email to the user's registered email address",
    type: AppResponse,
  })
  async resetPasswordByEmail(
    @Body() dto: ResetPasswordByEmailDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.resetPasswordByEmail(dto.email);
    return {
      message: i18n.t('auth.success.resetPasswordMailSent'),
      statusCode: 201,
    };
  }

  @Patch('reset-password/by-email/confirm')
  @ApiOkResponse({
    description: 'Complete the password reset process by confirming the email',
    type: AppResponse,
  })
  async confirmResetPasswordByEmail(
    @Body() dto: ConfirmResetUserPasswordByPasswordDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.authService.confirmResetPasswordByEmail(
      dto.resetToken,
      dto.password,
    );
    return {
      message: i18n.t('auth.success.resetPassword'),
      statusCode: HttpStatus.OK,
    };
  }
}
