import { Lesson } from '../../lessons/entities/lesson.entity';

export class Instructor {
  id: string;
  name: string;
  email: string;

  lessons: Lesson[];

  created_at: Date;
  updated_at: Date;
}
