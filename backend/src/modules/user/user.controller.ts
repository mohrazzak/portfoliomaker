import {
  Controller,
  Req,
  Body,
  HttpStatus,
  UseGuards,
  Put,
  Delete,
  Get,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  AppUserResponse,
  ReturnedUserResponse,
  userChangeEmailDto,
  userUpdateDto,
} from './dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { IAuthRequest } from 'src/shared';
import { Role } from 'src/generated/zod/enums';
import { AuthGuard, RoleGuard } from 'src/core';
import { I18n, I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { I18nHeader } from 'src/core/decorators/api';
import { ReturnedResponse } from 'src/shared/interfaces/response.interface';
import { UserId } from 'src/core/decorators';
import { UserEntityMapper } from './services/entity-mapper.service';

@ApiTags('users')
@I18nHeader()
@Controller('user')
export class userController {
  constructor(
    private readonly userService: UserService,
    private readonly userEntityMapper: UserEntityMapper,
  ) {}

  @Get('/me')
  @ApiOkResponse({
    description: 'Updates the user info by replacing it with new ones',
    type: AppUserResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.USER]))
  async getMe(
    @UserId() userId: string,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserResponse> {
    const user = await this.userService.findPublicByIdOrThrow(userId);

    return {
      data: { user },
      message: i18n.t('shared.success.getOne', {
        args: { entity: 'user' },
      }),
      statusCode: HttpStatus.OK,
    };
  }

  @Patch('/change-email')
  @ApiOkResponse({
    description: 'Updates the user email by replacing it with new one',
    type: AppUserResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.USER]))
  async changeEmail(
    @UserId() userId: string,
    @Body() dto: userChangeEmailDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserResponse> {
    await this.userService.changeEmail(userId, dto.email);
    const userModel = await this.userService.findByIdOrThrow(userId);
    const userEntity = this.userEntityMapper.modelToEntity(userModel);

    return {
      data: { user: userEntity },
      message: i18n.t('user.success.changeEmail'),
      statusCode: HttpStatus.OK,
    };
  }

  @Put('/')
  @ApiOkResponse({
    description: 'Updates the user info by replacing it with new ones',
    type: AppUserResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.USER]))
  async update(
    @Req() req: IAuthRequest,
    @Body() dto: userUpdateDto,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedUserResponse> {
    const user = await this.userService.update(req.user.id, dto);
    const publicUser = await this.userService.findPublicByIdOrThrow(user.id);

    return {
      data: { user: publicUser },
      message: i18n.t('shared.success.update', {
        args: { entity: 'user' },
      }),
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('/')
  @ApiOkResponse({
    description: 'Deletes the user account',
    type: AppUserResponse,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @UseGuards(new RoleGuard([Role.USER]))
  async delete(
    @Req() req: IAuthRequest,
    @I18n() i18n: I18nContext<I18nTranslations>,
  ): Promise<ReturnedResponse> {
    await this.userService.delete(req.user.id);
    return {
      message: i18n.t('shared.success.delete', {
        args: { entity: 'user' },
      }),
      statusCode: HttpStatus.OK,
    };
  }
}
