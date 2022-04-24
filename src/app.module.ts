import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';
import { LessonsModule } from './lessons/lessons.module';
import { TrailsModule } from './trails/trails.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InstructorsModule,
    LessonsModule,
    TrailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
