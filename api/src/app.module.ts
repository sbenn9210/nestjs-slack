import { Module } from '@nestjs/common';
import { ChannelsModule } from './channels/channels.module';
import { GatewayModule } from './events/gateway.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    GatewayModule,
    ChannelsModule,
    HealthModule,
  ],
})
export class AppModule {}
