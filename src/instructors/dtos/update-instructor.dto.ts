import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString } from 'class-validator';
import { CreateInstructorDto } from './create-instructor.dto';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}
