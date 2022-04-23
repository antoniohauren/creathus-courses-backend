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
    return this.prisma.instructor.findMany();
  }

  findOne(id: string) {
    return this.prisma.instructor.findUnique({ where: { id } });
  }

  update(id: string, updateInstructorDto: UpdateInstructorDto) {
    return this.prisma.instructor.update({
      where: { id },
      data: updateInstructorDto,
    });
  }

  remove(id: string) {
    return this.prisma.instructor.delete({ where: { id } });
  }
}
