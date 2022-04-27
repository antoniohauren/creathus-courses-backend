import { ApiProperty } from '@nestjs/swagger';

export class Lesson {
  @ApiProperty()
  id: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  instructor_id: string;

  @ApiProperty()
  course_id: string;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
