import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CreateInstructorDto } from './create-instructor.dto';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
  @ApiProperty()
  @ApiPropertyOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @ApiPropertyOptional()
  @IsEmail()
  email?: string;
}
