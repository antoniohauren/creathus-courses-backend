import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Lesson } from '../entities/lesson.entity';
import { LessonsController } from '../lessons.controller';
import { LessonsService } from '../lessons.service';

describe('LessonsController', () => {
  let controller: LessonsController;

  const lessonStub: Lesson = {
    id: 'any_id',
    duration: 0,
    instructor_id: 'any_instructor_id',
    created_at: undefined,
    updated_at: undefined,
  };

  const lessonServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
    findAll: jest.fn(() => [lessonStub]),
    findOne: jest.fn((id) => ({ ...lessonStub, id })),
    update: jest.fn((id, data) => ({ ...lessonStub, ...data, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonsController],
      providers: [
        {
          provide: LessonsService,
          useValue: lessonServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new lesson', () => {
      expect(
        controller.create({ duration: 50, instructor_email: 'any_email' }),
      ).toEqual(
        expect.objectContaining({
          duration: 50,
          instructor_email: 'any_email',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('Should return a list of lessons', () => {
      expect(controller.findAll()).toEqual(
        expect.arrayContaining([lessonStub]),
      );
    });
  });

  describe('findOne', () => {
    it('Should return a lesson', () => {
      expect(controller.findOne('any_id')).toEqual(
        expect.objectContaining({ ...lessonStub, id: 'any_id' }),
      );
    });
  });

  describe('update', () => {
    it('Should return a updated lesson', () => {
      expect(controller.update('any_id', { duration: 20 })).toEqual(
        expect.objectContaining({
          id: 'any_id',
          duration: 20,
        }),
      );
    });
  });
});
