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
    return this.prisma.trail.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} trail`;
  }

  update(id: number, updateTrailDto: UpdateTrailDto) {
    return `This action updates a #${id} trail`;
  }

  remove(id: number) {
    return `This action removes a #${id} trail`;
  }
}