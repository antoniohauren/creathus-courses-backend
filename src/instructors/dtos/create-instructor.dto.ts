import { IsEmail, IsString } from 'class-validator';

export class CreateInstructorDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
