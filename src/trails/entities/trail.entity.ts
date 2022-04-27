import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/entities/courses.entity';

export class Trail {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  courses: Course[];

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;
}
