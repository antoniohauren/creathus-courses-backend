import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTrailDto {
  @ApiProperty()
  @IsString()
  name: string;
}
