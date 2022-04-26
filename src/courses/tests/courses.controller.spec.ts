import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Course } from '../entities/courses.entity';
import { CoursesController } from '../courses.controller';
import { CoursesService } from '../courses.service';

describe('CoursesController', () => {
  let controller: CoursesController;

  const courseStub: Partial<Course> = {
    id: 'stub_id',
    title: 'stub_title',
  };

  const courseServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
    findAll: jest.fn(() => [courseStub]),
    findOne: jest.fn((id) => ({ ...courseStub, id })),
    update: jest.fn((id, data) => ({ ...courseStub, ...data, id })),
    remove: jest.fn((id) => ({ ...courseStub, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [
        { provide: CoursesService, useValue: courseServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const fakeDate = new Date();

    it('Should create a new course', () => {
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

  describe('findAll', () => {
    it('Should return a list of courses', () => {
      expect(controller.findAll()).toEqual(
        expect.arrayContaining([courseStub]),
      );
    });
  });

  describe('findOne', () => {
    it('Should return a course', () => {
      expect(controller.findOne('any_id')).toEqual(
        expect.objectContaining({ ...courseStub, id: 'any_id' }),
      );
    });
  });

  describe('update', () => {
    it('Should return a updated course', () => {
      expect(controller.update('any_id', { title: 'any_title' })).toEqual(
        expect.objectContaining({
          id: 'any_id',
          title: 'any_title',
        }),
      );
    });
  });

  describe('remove', () => {
    it('Should return a removed course', () => {
      expect(controller.remove('any_id')).toEqual(
        expect.objectContaining({
          id: 'any_id',
        }),
      );
    });
  });
});
