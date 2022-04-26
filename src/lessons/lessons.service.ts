import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto, UpdateLessonDto } from './dtos';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async create(createLessonDto: CreateLessonDto) {
    const instructor = await this.prisma.instructor.findUnique({
      where: { email: createLessonDto.instructor_email },
    });

    if (!instructor)
      throw new BadRequestException(
        'Não foi encontrado Nenhum instrutor com esse email!',
      );

    const course = await this.prisma.course.findUnique({
      where: { id: createLessonDto.course_id },
    });

    if (!course)
      throw new BadRequestException(
        'Não foi encontrado Nenhum curso com esse ID!',
      );

    return this.prisma.lesson.create({
      data: {
        duration: createLessonDto.duration,
        instructor: {
          connect: {
            id: instructor.id,
          },
        },
        course: {
          connect: {
            id: course.id,
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.lesson.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.lesson.findUnique({ where: { id } });

    if (!result) throw new NotFoundException('Aula não encontrada!');

    return result;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    await this.findOne(id);

    if (!updateLessonDto.instructor_email) {
      return this.prisma.lesson.update({
        where: { id },
        data: updateLessonDto,
      });
    }

    const instructor = await this.prisma.instructor.findUnique({
      where: { email: updateLessonDto.instructor_email },
    });

    if (!instructor)
      throw new BadRequestException(
        'Não foi encontrado Nenhum instrutor com esse email!',
      );

    return this.prisma.lesson.update({
      where: { id },
      data: {
        duration: updateLessonDto.duration,
        instructor: {
          connect: {
            id: instructor.id,
          },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.lesson.delete({ where: { id } });
  }
}
