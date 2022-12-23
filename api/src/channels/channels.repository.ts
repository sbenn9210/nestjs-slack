import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Injectable()
export class ChannelsRepository {
  constructor(private prisma: PrismaService) {}

  async create(createChannelDto: CreateChannelDto) {
    return await this.prisma.channel.create({ data: createChannelDto });
  }

  async findAll() {
    return await this.prisma.channel.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.channel.findUnique({
      where: {
        id,
      },
      include: {
        Message: true,
      },
    });
  }

  update(id: number, updateChannelDto: UpdateChannelDto) {
    return `This action updates a #${id} channel`;
  }

  remove(id: number) {
    return `This action removes a #${id} channel`;
  }
}
