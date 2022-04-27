import { Injectable } from '@nestjs/common';
import { CreateTrailDto } from './dto/create-trail.dto';
import { UpdateTrailDto } from './dto/update-trail.dto';

@Injectable()
export class TrailsService {
  create(createTrailDto: CreateTrailDto) {
    return 'This action adds a new trail';
  }

  findAll() {
    return `This action returns all trails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trail`;
  }

  update(id: number, updateTrailDto: UpdateTrailDto) {
    return `This action updates a #${id} trail`;
  }

  remove(id: number) {
    return `This action removes a #${id} trail`;
  }
}
