import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Instructor } from '../entities/instructor.entity';
import { InstructorsController } from '../instructors.controller';
import { InstructorsService } from '../instructors.service';

describe('InstructorsController', () => {
  let controller: InstructorsController;

  const instructorServiceMock = {
    create: jest.fn((data) => ({ id: 'any_id', ...data })),
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
});
