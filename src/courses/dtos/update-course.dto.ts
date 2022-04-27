import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateCourseDto } from './create-course.dto';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  trail_id?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  start_date?: Date;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  end_date?: Date;
}
