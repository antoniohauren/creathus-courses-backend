import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Course } from '../entities/courses.entity';
import { CoursesService } from '../courses.service';

describe('CourseService', () => {
  let service: CoursesService;
  let prisma: PrismaService;

  const couseStub: Partial<Course> = {
    id: 'stub_id',
    title: 'stub_title',
  };

  const PrismaServiceMock = {
    course: {
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
      findUnique: jest.fn(({ where }) => ({ ...couseStub, id: where.id })),
      update: jest.fn(({ where, data }) => ({
        ...couseStub,
        ...data,
        id: where.id,
      })),
      delete: jest.fn(({ where }) => ({ ...couseStub, id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const fakeDate = new Date();

    it('Should return an a new course', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const result = await service.create({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
        trail_id: 'any_id',
      });

      expect(createSpy).toHaveBeenCalledWith({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
        trail_id: 'any_id',
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
    it('Should return a course', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await service.findOne('any_id');

      expect(findOneSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if course not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.course, 'findUnique')
        .mockResolvedValueOnce(null);
      const promise = service.findOne('any_id');

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new NotFoundException('Curso não encontrado!'),
      );
    });
  });

  describe('update', () => {
    it('Should return an updated course', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const result = await service.update('any_id', {
        title: 'updated_title',
      });

      expect(updateSpy).toHaveBeenCalled();
      expect(result).toEqual(
        expect.objectContaining({ id: 'any_id', title: 'updated_title' }),
      );
    });

    it('Should throw 404 if course not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.course, 'findUnique')
        .mockResolvedValueOnce(null);
      const promise = service.update('any_id', {
        title: 'updated_title',
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new NotFoundException('Curso não encontrado!'),
      );
    });
  });

  describe('remove', () => {
    it('Should return a deleted course', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const result = await service.remove('any_id');

      expect(removeSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if course not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.course, 'findUnique')
        .mockResolvedValueOnce(null);
      const promise = service.remove('any_id');

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new NotFoundException('Curso não encontrado!'),
      );
    });
  });
});
