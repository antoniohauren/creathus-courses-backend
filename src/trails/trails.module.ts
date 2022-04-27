import { Module } from '@nestjs/common';
import { TrailsService } from './trails.service';
import { TrailsController } from './trails.controller';

@Module({
  controllers: [TrailsController],
  providers: [TrailsService],
})
export class TrailsModule {}
