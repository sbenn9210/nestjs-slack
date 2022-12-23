import {
  IsAlphanumeric,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateChannelDto {
  @IsNotEmpty()
  @MinLength(3)
  @IsAlphanumeric()
  name: string;

  @IsString()
  teamId: string;

  @IsBoolean()
  public: boolean;
}
