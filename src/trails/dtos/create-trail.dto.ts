import { IsString } from 'class-validator';

export class CreateTrailDto {
  @IsString()
  name: string;
}
