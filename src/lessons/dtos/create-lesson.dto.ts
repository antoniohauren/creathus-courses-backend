import { IsEmail, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  @IsPositive()
  duration: number;

  @IsEmail()
  instructor_email: string;

  @IsUUID()
  course_id: string;
}
