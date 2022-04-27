import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Trail } from '../entities/trail.entity';
import { TrailsController } from '../trails.controller';
import { TrailsService } from '../trails.service';

describe('TrailsController', () => {
  let controller: TrailsController;

  const TrailStub: Partial<Trail> = {
    id: 'stub_id',
    name: 'stub_name',
    courses: [],
  };

  const TrailServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
    findAll: jest.fn(() => [TrailStub]),
    findOne: jest.fn((id) => ({ ...TrailStub, id })),
    update: jest.fn((id, data) => ({ ...TrailStub, ...data, id })),
    remove: jest.fn((id) => ({ ...TrailStub, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrailsController],
      providers: [
        { provide: TrailsService, useValue: TrailServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<TrailsController>(TrailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new trail', () => {
      expect(controller.create({ name: 'any_name' })).toEqual(
        expect.objectContaining({
          name: 'any_name',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('Should return a list of trails', () => {
      expect(controller.findAll()).toEqual(expect.arrayContaining([TrailStub]));
    });
  });

  describe('findOne', () => {
    it('Should return a trail', () => {
      expect(controller.findOne('any_id')).toEqual(
        expect.objectContaining({
          ...TrailStub,
          id: 'any_id',
        }),
      );
    });
  });

  describe('update', () => {
    it('Should return an updated trail', () => {
      expect(controller.update('any_id', { name: 'updated_name' })).toEqual(
        expect.objectContaining({
          id: 'any_id',
          name: 'updated_name',
        }),
      );
    });
  });

  describe('remove', () => {
    it('Should return a removed trail', () => {
      expect(controller.remove('any_id')).toEqual(
        expect.objectContaining({
          id: 'any_id',
        }),
      );
    });
  });
});
