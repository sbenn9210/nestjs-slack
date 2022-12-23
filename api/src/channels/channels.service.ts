import { Injectable } from '@nestjs/common';
import { ChannelsRepository } from './channels.repository';
import { CreateChannelDto } from './dto/create-channel.dto';

@Injectable()
export class ChannelsService {
  constructor(private channelRepository: ChannelsRepository) {}

  async create(createChannelDto: CreateChannelDto) {
    return await this.channelRepository.create(createChannelDto);
  }

  async findAll() {
    return await this.channelRepository.findAll();
  }

  async findOne(id: string) {
    return await this.channelRepository.findOne(id);
  }
}
