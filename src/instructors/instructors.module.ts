import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [InstructorsController],
  providers: [InstructorsService, PrismaService],
})
export class InstructorsModule {}
