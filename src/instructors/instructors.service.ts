import { Injectable } from '@nestjs/common';
import { CreateInstructorDto, UpdateInstructorDto } from './dtos';

@Injectable()
export class InstructorsService {
  create(createInstructorDto: CreateInstructorDto) {
    return 'This action adds a new instructor';
  }

  findAll() {
    return `This action returns all instructors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instructor`;
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return `This action updates a #${id} instructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} instructor`;
  }
}
