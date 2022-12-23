import { Channel } from '@prisma/client';

export class ChannelsEntity implements Channel {
  id: string;
  name: string;
  description: string;
  teamId: string | null;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
}
