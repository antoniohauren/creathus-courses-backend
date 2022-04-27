import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dtos';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    const result = await this.prisma.course.findMany({
      include: {
        trail: {
          select: {
            name: true,
          },
        },
        lessons: {
          include: {
            instructor: true,
          },
        },
      },
    });

    const courses = result.map(({ lessons, ...course }) => {
      return {
        ...course,
        instructors: lessons.reduce((pv, { instructor: { name } }) => {
          return [...pv.filter(() => !pv.includes(name)), name];
        }, []),
        lession_count: lessons.length,
        total_duration: lessons.reduce((pv, cv) => pv + cv.duration, 0),
      };
    });

    return courses;
  }

  async findOne(id: string) {
    const result = await this.prisma.course.findUnique({ where: { id } });

    if (!result) throw new NotFoundException('Curso não encontrado!');

    return result;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    await this.findOne(id);

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.course.delete({ where: { id } });
  }
}
