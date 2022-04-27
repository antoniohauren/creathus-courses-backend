import { Course } from '../../courses/entities/courses.entity';

export class Trail {
  id: string;
  name: string;
  courses: Course[];

  created_at: Date;
  updated_at: Date;
}
