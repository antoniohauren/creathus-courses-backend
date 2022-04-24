import { Injectable } from '@nestjs/common';
import { CreateLessonDto, UpdateLessonDto } from './dtos';

@Injectable()
export class LessonsService {
  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  findAll() {
    return `This action returns all lessons`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
