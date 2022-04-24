import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNumber, IsPositive } from 'class-validator';
import { CreateLessonDto } from './create-lesson.dto';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
  @IsNumber()
  @IsPositive()
  duration?: number;

  @IsEmail()
  instructor_email?: string;
}
