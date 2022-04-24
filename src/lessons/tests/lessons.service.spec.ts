import { Test, TestingModule } from '@nestjs/testing';
import { Instructor } from '../../instructors/entities/instructor.entity';
import { PrismaService } from '../../prisma/prisma.service';
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

  const PrismaServiceMock = {
    lesson: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        duration: data.duration,
        instructor_id: `any_instructor_id`,
      })),
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
  });
});
