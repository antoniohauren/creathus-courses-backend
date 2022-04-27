import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Trail } from '../entities/trail.entity';
import { TrailsService } from '../trails.service';

describe('TrailsService', () => {
  let service: TrailsService;

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
});
