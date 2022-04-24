import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { Instructor } from '../entities/instructor.entity';
import { InstructorsService } from '../instructors.service';

describe('InstructorsService', () => {
  let service: InstructorsService;
  let prisma: PrismaService;

  const instructorStub: Partial<Instructor> = {
    id: 'stub_id',
    email: 'stub_email',
    name: 'stub_name',
  };

  const PrismaServiceMock = {
    instructor: {
      create: jest.fn(({ data }) => ({
        id: 'any_id',
        ...data,
      })),
      findMany: jest.fn(() => [instructorStub]),
      findUnique: jest.fn(({ where }) => ({ ...instructorStub, id: where.id })),
      update: jest.fn(({ where, data }) => ({
        id: where.id,
        ...data,
      })),
      delete: jest.fn(({ where }) => ({ ...instructorStub, id: where.id })),
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
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('Should create a new instructor', async () => {
      const createSpy = jest.spyOn(service, 'create');
      const findUniqueSpy = jest
        .spyOn(prisma.instructor, 'findUnique')
        .mockReturnValueOnce(null);
      const result = await service.create({
        name: 'any_name',
        email: 'any_email',
      });

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(createSpy).toHaveBeenCalledWith({
        name: 'any_name',
        email: 'any_email',
      });
      expect(result).toEqual(
        expect.objectContaining({ name: 'any_name', email: 'any_email' }),
      );
    });

    it('Should throw 400 if email is already in use', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const promise = service.create({
        name: 'any_name',
        email: 'any_email',
        //
      });

      expect(createSpy).toHaveBeenCalledWith({
        name: 'any_name',
        email: 'any_email',
      });

      expect(promise).rejects.toThrowError(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('Should return a list of instructors', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');
      const result = await service.findAll();

      expect(findAllSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.arrayContaining([instructorStub]));
    });
  });

  describe('findOne', () => {
    it('Should return an instructor with correct id', async () => {
      const findOneSpy = jest.spyOn(service, 'findOne');
      const result = await service.findOne('any_id');

      expect(findOneSpy).toHaveBeenCalled();
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if instructor not found', async () => {
      const findUniqueSpy = jest
        .spyOn(prisma.instructor, 'findUnique')
        .mockResolvedValueOnce(null);
      const promise = service.findOne('any_id');

      expect(findUniqueSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('Should return an updated instructor', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const result = await service.update('any_id', { name: 'updated_name' });

      expect(updateSpy).toHaveBeenCalledWith('any_id', {
        name: 'updated_name',
      });
      expect(result).toEqual(
        expect.objectContaining({ id: 'any_id', name: 'updated_name' }),
      );
    });

    it('Should throw 404 if instructor not found', async () => {
      const updateSpy = jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      const promise = service.update('any_id', { name: 'updated_name' });

      expect(updateSpy).toHaveBeenCalled();
      expect(promise).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('Should return a deleted instructor', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const result = await service.remove('any_id');

      expect(removeSpy).toHaveBeenCalledWith('any_id');
      expect(result).toEqual(expect.objectContaining({ id: 'any_id' }));
    });

    it('Should throw 404 if instructor not found', async () => {
      const removeSpy = jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      const promise = service.remove('any_id');

      expect(removeSpy).toHaveBeenCalledWith('any_id');
      expect(promise).rejects.toThrow(NotFoundException);
    });
  });
});
