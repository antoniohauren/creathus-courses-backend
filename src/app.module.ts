import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [ConfigModule.forRoot(), InstructorsModule, LessonsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
