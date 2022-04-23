import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dtos';

@Injectable()
export class InstructorsService {
  constructor(private prisma: PrismaService) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.prisma.instructor.create({
      data: createInstructorDto,
    });
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
