import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID()
  @IsOptional()
  trail_id?: string;

  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @IsDateString()
  @IsOptional()
  end_date?: Date;
}
