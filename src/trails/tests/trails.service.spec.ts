import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Trail } from '../entities/trail.entity';
import { TrailsService } from '../trails.service';

describe('TrailsService', () => {
  let service: TrailsService;

  const trailStub: Partial<Trail> = {
    id: 'stub_id',
    title: 'stub_title',
  };

  const PrismaServiceMock = {
    trail: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        ...data,
      })),
      findMany: jest.fn().mockImplementation(() => {
        return [
          {
            lessons: [
              { instructor: { name: 'instructor_name' }, duration: 10 },
              { instructor: { name: 'instructor_name' }, duration: 20 },
            ],
          },
        ];
      }),
      findUnique: jest.fn(({ where }) => ({ ...trailStub, id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrailsService,
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<TrailsService>(TrailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const fakeDate = new Date();

    it('Should return an a new trail', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const result = await service.create({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
      });

      expect(createSpy).toHaveBeenCalledWith({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
      });
      expect(result).toEqual(
        expect.objectContaining({
          title: 'any_title',
          start_date: fakeDate,
          end_date: fakeDate,
        }),
      );
    });
  });

  describe('findAll', () => {
    it('Should return trials information', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const result = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            instructors: ['instructor_name'],
            lession_count: 2,
            total_duration: 30,
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('Should return a trail', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await service.findOne('any_id');

      expect(findOneSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });
  });
});
