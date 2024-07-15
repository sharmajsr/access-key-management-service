import { Module } from '@nestjs/common';
import { AccessKeyController } from './api/controllers';
import { KeyClient } from './connectors/clients';
import { CqrsModule } from '@nestjs/cqrs';
import { RedisService } from './redis';
import { KeyCreateCommandHandler, KeyDeleteHandler, KeyGetAllQueryHandler, KeyGetQueryHandler, UserAccessQueryHandler } from './api/handlers';
import { KeyMapper } from './api/core/mappers';
import { KeyUpdateCommandHandler } from './api/handlers/key-update-command.handler';

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [AccessKeyController],
  providers: [
    KeyClient,
    RedisService,
    KeyMapper,
    KeyGetQueryHandler,
    KeyCreateCommandHandler,
    UserAccessQueryHandler,
    KeyUpdateCommandHandler,
    KeyGetAllQueryHandler,
    KeyDeleteHandler
  ],
})
export class AppModule {}
