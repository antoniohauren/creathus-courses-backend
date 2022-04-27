import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  duration: number;

  @ApiProperty()
  @IsEmail()
  instructor_email: string;

  @ApiProperty()
  @IsUUID()
  course_id: string;
}
