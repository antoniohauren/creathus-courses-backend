import { IsDateString, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;
}
