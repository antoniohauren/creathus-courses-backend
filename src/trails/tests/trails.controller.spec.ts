import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { TrailsController } from '../trails.controller';
import { TrailsService } from '../trails.service';

describe('TrailsController', () => {
  let controller: TrailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailsController],
      providers: [TrailsService, PrismaService],
    }).compile();

    controller = module.get<TrailsController>(TrailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
