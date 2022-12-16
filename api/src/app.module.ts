import { Module } from '@nestjs/common';
import { ChannelsModule } from './channels/channels.module';
import { GatewayModule } from './events/gateway.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, GatewayModule, ChannelsModule],
})
export class AppModule {}
