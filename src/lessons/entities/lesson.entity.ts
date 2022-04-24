import { Instructor } from '../../instructors/entities/instructor.entity';

export class Lesson {
  id: string;
  duration: number;

  instructor: Instructor;

  created_at: Date;
  updated_at: Date;
}
