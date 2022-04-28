import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsUUID()
  trail_id: string;

  @ApiProperty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsDateString()
  end_date: Date;

  @ApiProperty()
  @IsDateString()
  open_date: Date;

  @ApiProperty()
  @IsString()
  location: string;
}
