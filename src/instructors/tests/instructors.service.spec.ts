import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Instructor } from '../entities/instructor.entity';
import { InstructorsService } from '../instructors.service';

describe('InstructorsService', () => {
  let service: InstructorsService;

  const InstructorStub: Instructor = {
    id: 'any_id',
    email: 'any_email',
    name: 'any_name',
  };

  const PrismaServiceMock = {
    instructor: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        ...data,
      })),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstructorsService,
        {
          provide: PrismaService,
          useValue: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<InstructorsService>(InstructorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should create a new instructor', async () => {
    const createSpy = jest.spyOn(service, 'create');
    const result = await service.create({
      name: 'any_name',
      email: 'any_email',
    });

    expect(createSpy).toBeCalledWith({ name: 'any_name', email: 'any_email' });
    expect(result).toEqual(
      expect.objectContaining({ name: 'any_name', email: 'any_email' }),
    );
  });
});
