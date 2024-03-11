import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SourceCode } from 'eslint';
import Config = SourceCode.Config;
import Redis from 'ioredis';

import { RedisConfig } from '../../configs/config.type';
import { RedisService } from './redis.service';

const redisProvider = {
  provide: 'REDIS_PROVIDER',
  useFactory: (configService: ConfigService<Config>) => {
    const redisConfig = configService.get<RedisConfig>('redis');

    return new Redis({
      host: redisConfig.host,
      port: redisConfig.port,
      password: redisConfig.password,
    });
  },
  inject: [ConfigService],
};

@Module({
  imports: [],
  controllers: [],
  providers: [redisProvider, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
