import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto, UpdateLessonDto } from './dtos';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { email: createLessonDto.instructor_email },
    });

    if (!instructor) throw new BadRequestException('Instructor not found');

    return this.prisma.lesson.create({
      data: {
        duration: createLessonDto.duration,
        instructor: {
          connect: {
            id: instructor.id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.lesson.findMany();
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
