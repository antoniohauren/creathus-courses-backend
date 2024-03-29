import { BadRequestException, NotFoundException } from '@nestjs/common';
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
            trail: {
              name: 'trail_name',
            },
            lessons: [
              {
                instructor: { name: 'instructor_name' },
                duration: 10,
              },
              {
                instructor: { name: 'instructor_name' },
                duration: 20,
              },
            ],
            start_date: new Date(),
            end_date: new Date(),
            open_date: new Date(),
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
    trail: {
      findUnique: jest.fn(({ where }) => ({ id: where.id })),
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
        open_date: fakeDate,
        trail_id: 'any_id',
        location: 'any_location',
      });

      expect(createSpy).toHaveBeenCalledWith({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
        open_date: fakeDate,
        trail_id: 'any_id',
        location: 'any_location',
      });
      expect(result).toEqual(
        expect.objectContaining({
          title: 'any_title',
          start_date: fakeDate,
          end_date: fakeDate,
        }),
      );
    });

    it('Should throw if invalid trail_id is provided', async () => {
      const createSpy = jest.spyOn(service, 'create');
      jest.spyOn(prisma.trail, 'findUnique').mockResolvedValueOnce(null);

      const promise = service.create({
        title: 'any_title',
        start_date: fakeDate,
        end_date: fakeDate,
        open_date: fakeDate,
        trail_id: 'any_id',
        location: 'any_location',
      });

      expect(createSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new BadRequestException('Trilha não encontrada!'),
      );
    });
  });

  describe('findAll', () => {
    it('Should return courses information', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const result = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            instructors: ['instructor_name'],
            lesson_count: 2,
            total_duration: 30,
          }),
        ]),
      );
    });

    it('Should return -- if there is no instructors', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      jest.spyOn(prisma.course, 'findMany').mockResolvedValueOnce([
        {
          trail: {
            name: 'trail_name',
          },
          lessons: [],
          start_date: new Date(),
          end_date: new Date(),
          open_date: new Date(),
        },
      ] as any);

      const result = await service.findAll();
      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            instructors: ['--'],
          }),
        ]),
      );
    });

    it('Should return open_date as valid if it is on the furure', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      jest.spyOn(prisma.course, 'findMany').mockResolvedValueOnce([
        {
          trail: {
            name: 'trail_name',
          },
          lessons: [],
          start_date: new Date(),
          end_date: new Date(),
          open_date: new Date('2500-12-31T05:00:00.000Z'),
        },
      ] as any);

      const result = await service.findAll();
      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            open_date: '31/12',
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
