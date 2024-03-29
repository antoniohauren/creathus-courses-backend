import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Course } from '../../courses/entities/courses.entity';
import { Instructor } from '../../instructors/entities/instructor.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Lesson } from '../entities/lesson.entity';
import { LessonsService } from '../lessons.service';

describe('LessonsService', () => {
  let service: LessonsService;
  let prisma: PrismaService;

  const courseStub: Partial<Course> = {
    id: 'stub_id',
    title: 'stub_title',
  };

  const instructorStub: Instructor = {
    id: 'stub_id',
    email: 'stub_email',
    name: 'stub_name',
    lessons: [],
    created_at: undefined,
    updated_at: undefined,
  };

  const lessonStub: Partial<Lesson> = {
    id: 'any_id',
    duration: 0,
    instructor_id: 'any_instructor_id',
    course_id: 'any_course_id',
  };

  const PrismaServiceMock = {
    lesson: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        duration: data.duration,
        instructor_id: `any_instructor_id`,
      })),
      findMany: jest.fn(() => [lessonStub]),
      findUnique: jest.fn(({ where }) => ({ ...lessonStub, id: where.id })),
      update: jest.fn(({ where, data }) => ({
        id: where.id,
        ...data,
      })),
      delete: jest.fn(({ where }) => ({ ...lessonStub, id: where.id })),
    },
    instructor: {
      findUnique: jest.fn(({ where }) => ({ ...instructorStub, id: where.id })),
    },
    course: {
      findUnique: jest.fn(({ where }) => ({ ...courseStub, id: where.id })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonsService,
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<LessonsService>(LessonsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new lesson', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const findUniqueSpy = jest.spyOn(prisma.instructor, 'findUnique');

      const result = await service.create({
        duration: 30,
        instructor_email: 'any_email@mail.com',
        course_id: 'course_id',
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        duration: 30,
        instructor_email: 'any_email@mail.com',
        course_id: 'course_id',
      });

      expect(result).toEqual(
        expect.objectContaining({
          duration: 30,
          instructor_id: 'any_instructor_id',
        }),
      );
    });

    it('Should throw 400 if instructor not found', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const findUniqueSpy = jest
        .spyOn(prisma.instructor, 'findUnique')
        .mockReturnValueOnce(null);
      const promise = service.create({
        duration: 30,
        instructor_email: 'invalid_email@mail.com',
        course_id: 'course_id',
      });

      expect(createSpy).toHaveBeenCalledWith({
        duration: 30,
        instructor_email: 'invalid_email@mail.com',
        course_id: 'course_id',
      });
      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new BadRequestException(
          'Não foi encontrado Nenhum instrutor com esse email!',
        ),
      );
    });

    it('Should throw 400 if course not found', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const findUniqueSpy = jest
        .spyOn(prisma.course, 'findUnique')
        .mockReturnValueOnce(null);
      const promise = service.create({
        duration: 30,
        instructor_email: 'invalid_email@mail.com',
        course_id: 'course_id',
      });

      expect(createSpy).toHaveBeenCalledWith({
        duration: 30,
        instructor_email: 'invalid_email@mail.com',
        course_id: 'course_id',
      });
      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new BadRequestException('Não foi encontrado Nenhum curso com esse ID!'),
      );
    });
  });

  describe('findAll', () => {
    it('Should return a list of lessons', async () => {
      const finsAllSpy = jest.spyOn(service, 'findAll');
      const result = await service.findAll();

      expect(finsAllSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining([lessonStub]));
    });
  });

  describe('findOne', () => {
    it('Should return a lesson with correct id', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await service.findOne('any_id');

      expect(findOneSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should return 404 if lesson not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.lesson, 'findUnique')
        .mockReturnValueOnce(null);
      const promise = service.findOne('any_id');

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new NotFoundException('Aula não encontrada!'),
      );
    });
  });

  describe('update', () => {
    it('Should return an updated lesson', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const result = await service.update('any_id', { duration: 50 });
      expect(updateSpy).toHaveBeenCalledWith('any_id', { duration: 50 });
      expect(result).toEqual(
        expect.objectContaining({ id: 'any_id', duration: 50 }),
      );
    });

    it('Should throw 404 if lesson not found', async () => {
      const updateSpy = jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException('Aula não encontrada!'));
      const promise = service.update('any_id', { duration: 0 });

      expect(updateSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(
        new NotFoundException('Aula não encontrada!'),
      );
    });

    it('Should throw 400 if only instructor is provided and is not found', async () => {
      jest.spyOn(prisma.instructor, 'findUnique').mockResolvedValueOnce(null);

      const promise = service.update('any_id', {
        duration: 0,
        instructor_email: 'any_email',
      });

      expect(promise).rejects.toThrowError(
        new BadRequestException(
          'Não foi encontrado Nenhum instrutor com esse email!',
        ),
      );
    });

    it('Should throw 400 if only course is provided and is not found', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValueOnce(null);

      const promise = service.update('any_id', {
        duration: 0,
        course_id: 'any_id',
      });

      expect(promise).rejects.toThrowError(
        new BadRequestException('Não foi encontrado Nenhum curso com esse ID!'),
      );
    });

    it('Should update if valid email is provided', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.instructor, 'findUnique')
        .mockResolvedValueOnce(instructorStub);

      const result = await service.update('any_id', {
        instructor_email: 'any_email',
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should update if valid course is provided', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.instructor, 'findUnique')
        .mockResolvedValueOnce(instructorStub);

      const result = await service.update('any_id', {
        course_id: 'any_id',
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 400 if both are provided and course not found', async () => {
      jest.spyOn(prisma.course, 'findUnique').mockResolvedValueOnce(null);

      const promise = service.update('any_id', {
        duration: 0,
        instructor_email: 'any_email',
        course_id: 'any_id',
      });

      expect(promise).rejects.toThrowError(
        new BadRequestException('Não foi encontrado Nenhum curso com esse ID!'),
      );
    });

    it('Should throw 400 if both are provided and instructor not found', async () => {
      jest.spyOn(prisma.instructor, 'findUnique').mockResolvedValueOnce(null);

      const promise = service.update('any_id', {
        duration: 0,
        instructor_email: 'any_email',
        course_id: 'any_id',
      });

      expect(promise).rejects.toThrowError(
        new BadRequestException(
          'Não foi encontrado Nenhum instrutor com esse email!',
        ),
      );
    });

    it('Should resolve if both provided are valid', async () => {
      const result = await service.update('any_id', {
        duration: 0,
        instructor_email: 'any_email',
        course_id: 'any_id',
      });

      expect(result).toBeDefined();
    });
  });

  describe('remove', () => {
    it('Should return a deleted lesson', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const result = await service.remove('any_id');

      expect(removeSpy).toHaveBeenCalledWith('any_id');
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if lesson not found', async () => {
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      const promise = service.remove('any_id');

      expect(removeSpy).toHaveBeenCalledWith('any_id');
      expect(promise).rejects.toThrow(NotFoundException);
    });
  });
});
