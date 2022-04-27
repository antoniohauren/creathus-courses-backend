import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrailDto, UpdateTrailDto } from './dtos';

@Injectable()
export class TrailsService {
  constructor(private prisma: PrismaService) {}

  create(createTrailDto: CreateTrailDto) {
    return this.prisma.trail.create({
      data: createTrailDto,
    });
  }

  findAll() {
    return this.prisma.trail.findMany({
      include: {
        courses: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const result = await this.prisma.trail.findUnique({ where: { id } });
    if (!result) throw new NotFoundException('Trilha não encontrada!');
    return result;
  }

  async update(id: string, updateTrailDto: UpdateTrailDto) {
    await this.findOne(id);

    return this.prisma.trail.update({
      where: { id },
      data: updateTrailDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.trail.delete({ where: { id } });
  }
}
