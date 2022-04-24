import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Instructor } from '../../instructors/entities/instructor.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { Lesson } from '../entities/lesson.entity';
import { LessonsService } from '../lessons.service';

describe('LessonsService', () => {
  let service: LessonsService;
  let prisma: PrismaService;

  const instructorStub: Instructor = {
    id: 'stub_id',
    email: 'stub_email',
    name: 'stub_name',
    lessons: null,
    created_at: undefined,
    updated_at: undefined,
  };

  const lessonStub: Lesson = {
    id: 'any_id',
    duration: 0,
    instructor_id: 'any_instructor_id',
    created_at: undefined,
    updated_at: undefined,
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
      findUnique: jest.fn(() => ({ ...instructorStub })),
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
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        duration: 30,
        instructor_email: 'any_email@mail.com',
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
      });

      expect(createSpy).toHaveBeenCalledWith({
        duration: 30,
        instructor_email: 'invalid_email@mail.com',
      });
      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrowError(BadRequestException);
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

    it('Should throw 404 if instructor not found', async () => {
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
