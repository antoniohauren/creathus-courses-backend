import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Trail } from '../entities/trail.entity';
import { TrailsService } from '../trails.service';

describe('TrailsService', () => {
  let service: TrailsService;
  let prisma: PrismaService;

  const TrailStub: Partial<Trail> = {
    id: 'stub_id',
    name: 'stub_name',
    courses: [],
  };

  const PrismaServiceMock = {
    trail: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        ...data,
      })),
      findMany: jest.fn(() => [TrailStub]),
      findUnique: jest.fn(({ where }) => ({ ...TrailStub, id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrailsService,
        { provide: PrismaService, useValue: PrismaServiceMock },
      ],
    }).compile();

    service = module.get<TrailsService>(TrailsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should return an a new trail', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const result = await service.create({
        name: 'any_name',
      });

      expect(createSpy).toHaveBeenCalledWith({
        name: 'any_name',
      });
      expect(result).toEqual(
        expect.objectContaining({
          name: 'any_name',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('Should return a list of trails', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const result = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining([TrailStub]));
    });
  });

  describe('findOne', () => {
    it('Should return an trail with correct id', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await service.findOne('any_id');

      expect(findOneSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if instructor not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.trail, 'findUnique')
        .mockResolvedValueOnce(null);
      const promise = service.findOne('any_id');

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrow(
        new NotFoundException('Trilha não encontrada!'),
      );
    });
  });
});
