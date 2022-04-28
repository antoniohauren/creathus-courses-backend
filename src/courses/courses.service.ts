import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dtos';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const trail = await this.prisma.trail.findUnique({
      where: { id: createCourseDto.trail_id },
    });

    if (!trail) throw new BadRequestException('Trilha não encontrada!');

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

    const checkIsOpen = (dataString: Date) => {
      const today = new Date();
      if (dataString.getTime() > today.getTime()) return formatDate(dataString);
      return undefined;
    };

    const formatDate = (dateString: Date) => {
      return dateString.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
      });
    };

    const formatTime = (dateString: Date) => {
      return dateString.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Fortaleza',
      });
    };

    const courses = result.map(
      ({
        lessons,
        start_date,
        end_date,
        open_date,
        trail,
        trail_id,
        ...course
      }) => {
        return {
          ...course,
          start_date: [formatDate(start_date), formatTime(start_date)],
          end_date: formatDate(end_date),
          open_date: checkIsOpen(open_date),
          instructors: lessons.length
            ? lessons.reduce((pv, { instructor: { name } }) => {
                if (!pv.includes(name)) pv.push(name);
                return pv;
              }, [])
            : ['--'],
          trail: {
            id: trail_id,
            name: trail.name,
          },
          lesson_count: lessons.length,
          total_duration: lessons.reduce((pv, cv) => pv + cv.duration, 0),
        };
      },
    );

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
