import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Trail } from '../entities/trail.entity';
import { TrailsController } from '../trails.controller';
import { TrailsService } from '../trails.service';

describe('TrailsController', () => {
  let controller: TrailsController;

  const trailStub: Partial<Trail> = {
    id: 'stub_id',
    title: 'stub_title',
  };

  const trailServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailsController],
      providers: [
        { provide: TrailsService, useValue: trailServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<TrailsController>(TrailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const fakeDate = new Date();

    it('Should create a new lesson', () => {
      expect(
        controller.create({
          title: 'any_title',
          start_date: fakeDate,
          end_date: fakeDate,
        }),
      ).toEqual(
        expect.objectContaining({
          title: 'any_title',
        }),
      );
    });
  });
});
