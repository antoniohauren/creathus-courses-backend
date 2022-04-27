import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  trail_id: string;

  @ApiProperty()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @IsDateString()
  end_date: Date;
}
