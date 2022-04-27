import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateTrailDto } from './create-trail.dto';

export class UpdateTrailDto extends PartialType(CreateTrailDto) {
  @IsString()
  name?: string;
}
