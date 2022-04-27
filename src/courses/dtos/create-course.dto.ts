import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsUUID()
  @IsOptional()
  trail_id: string;

  @IsDateString()
  start_date: Date;

  @IsDateString()
  end_date: Date;
}
