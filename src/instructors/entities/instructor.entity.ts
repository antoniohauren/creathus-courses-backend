import { ApiProperty } from '@nestjs/swagger';
import { Lesson } from '../../lessons/entities/lesson.entity';

export class Instructor {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  lessons: Lesson[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
