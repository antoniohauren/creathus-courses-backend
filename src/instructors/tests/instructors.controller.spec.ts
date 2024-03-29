import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Instructor } from '../entities/instructor.entity';
import { InstructorsController } from '../instructors.controller';
import { InstructorsService } from '../instructors.service';

describe('InstructorsController', () => {
  let controller: InstructorsController;

  const instructorStub: Partial<Instructor> = {
    id: 'stub_id',
    email: 'stub_email',
    name: 'stub_name',
  };

  const instructorServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
    findAll: jest.fn(() => [instructorStub]),
    findOne: jest.fn((id) => ({ ...instructorStub, id })),
    update: jest.fn((id, data) => ({ ...instructorStub, ...data, id })),
    remove: jest.fn((id) => ({ ...instructorStub, id })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstructorsController],
      providers: [
        {
          provide: InstructorsService,
          useValue: instructorServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<InstructorsController>(InstructorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new instructor', () => {
      expect(
        controller.create({ email: 'any_email', name: 'any_name' }),
      ).toEqual(
        expect.objectContaining({
          email: 'any_email',
          name: 'any_name',
        }),
      );
    });
  });

  describe('findAll', () => {
    it('Should return a list of instructors', () => {
      expect(controller.findAll()).toEqual(
        expect.arrayContaining([instructorStub]),
      );
    });
  });

  describe('findOne', () => {
    it('Should return a instructor', () => {
      expect(controller.findOne('any_id')).toEqual(
        expect.objectContaining({
          ...instructorStub,
          id: 'any_id',
        }),
      );
    });
  });

  describe('update', () => {
    it('Should return a updated instructor', () => {
      expect(controller.update('any_id', { name: 'updated_name' })).toEqual(
        expect.objectContaining({
          id: 'any_id',
          name: 'updated_name',
        }),
      );
    });
  });

  describe('remove', () => {
    it('Should return a removed instructor', () => {
      expect(controller.remove('any_id')).toEqual(
        expect.objectContaining({
          id: 'any_id',
        }),
      );
    });
  });
});
