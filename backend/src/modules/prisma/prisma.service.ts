import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { appConfig } from '../../core/configs';
// import { PrismaClient } from 'src/generated/client';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DATABASE');
  constructor(
    @Inject(appConfig.KEY)
    private readonly configService: ConfigType<typeof appConfig>,
  ) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    // this.$use(
    //   createSoftDeleteMiddleware({
    //     models: {
    //       user: true,
    //     },
    //     defaultConfig: {
    //       field: 'deletedAt',
    //       createValue: (deleted) => {
    //         if (deleted) return new Date();
    //         return null;
    //       },
    //       allowToOneUpdates: true,
    //     },
    //   }),
    // );
    this.logger.log('DATABASE CONNECTED');
  }
}
