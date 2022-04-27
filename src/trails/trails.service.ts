import { Injectable } from '@nestjs/common';
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
        courses: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.trail.findUnique({ where: { id } });
  }

  update(id: string, updateTrailDto: UpdateTrailDto) {
    return this.prisma.trail.update({
      where: { id },
      data: updateTrailDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} trail`;
  }
}
