import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto, UpdateInstructorDto } from './dtos';

@Injectable()
export class InstructorsService {
  constructor(private prisma: PrismaService) {}

  async create(createInstructorDto: CreateInstructorDto) {
    const result = await this.prisma.instructor.findUnique({
      where: { email: createInstructorDto.email },
    });

    if (result) {
      throw new BadRequestException('Email already in use!');
    }

    return this.prisma.instructor.create({
      data: createInstructorDto,
    });
  }

  findAll() {
    return this.prisma.instructor.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.instructor.findUnique({ where: { id } });

    if (!result) throw new NotFoundException('Instructor not found!');

    return result;
  }

  async update(id: string, updateInstructorDto: UpdateInstructorDto) {
    await this.findOne(id);

    return this.prisma.instructor.update({
      where: { id },
      data: updateInstructorDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.instructor.delete({ where: { id } });
  }
}
