import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  duration?: number;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  instructor_email?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  course_id?: string;
}
