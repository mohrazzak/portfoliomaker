import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { userUpdateDto } from './dto';
import { UserModel } from './models';
import { omitDtoSchema } from 'src/shared';
import { MailerService } from './auth/mailer/mailer.service';
import { TokenService } from './token/token.service';
import { Role } from 'src/generated/zod/enums';
import { UserPublicSelectType } from './types/user-public-select.type';
import { UserEntity } from './entity';
import { SignupDto } from './auth/dto';

/**
 * Service for user related business.
 */
@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailerService,
    private readonly tokenService: TokenService,
  ) {}

  public static publicFields: UserPublicSelectType = {
    id: true,
    email: true,
    fullName: true,
    role: true,
    isActive: true,
    isBanned: true,
  };

  async findByEmailOrThrow(email: string): Promise<UserModel> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { email: email },
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByIdOrThrow(userId: string): Promise<UserModel> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }

  async changeEmail(userId: string, newEmail: string) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: { isActive: false, email: newEmail },
      select: { id: true },
    });

    const token = await this.tokenService.generateConfirmationToken(
      user.id,
      Role.USER,
      'EMAIL_RESET',
    );

    await this.mailerService.sendConfirmEmail(newEmail, token);
  }

  async update(userId: string, dto: userUpdateDto) {
    const { ...omittedDto } = omitDtoSchema(dto);
    return await this.prismaService.user.update({
      data: { ...omittedDto },
      where: { id: userId },
      select: { id: true },
    });
  }

  async delete(userId: string) {
    return await this.prismaService.user.delete({
      where: { id: userId },
      select: { id: true },
    });
  }

  async findPublicByIdOrThrow(id: string): Promise<UserEntity> {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id },
      select: UserService.publicFields,
    });
  }

  async create(dto: SignupDto) {
    return await this.prismaService.user.create({
      data: dto,
      select: { id: true },
    });
  }

  async findIdByEmailOrThrow(email: string) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { email },
      select: { id: true },
    });
  }
}
