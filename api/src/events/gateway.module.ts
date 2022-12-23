import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [MessagesModule],
  providers: [EventsGateway],
})
export class GatewayModule {}
