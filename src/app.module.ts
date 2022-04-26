import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';
import { LessonsModule } from './lessons/lessons.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InstructorsModule,
    LessonsModule,
    CoursesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
