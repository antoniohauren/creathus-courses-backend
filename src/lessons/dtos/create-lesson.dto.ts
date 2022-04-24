import { IsEmail, IsNumber, IsPositive } from 'class-validator';

export class CreateLessonDto {
  @IsNumber()
  @IsPositive()
  duration: number;

  @IsEmail()
  instructor_email: string;
}
