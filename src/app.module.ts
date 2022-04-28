import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';
import { LessonsModule } from './lessons/lessons.module';
import { CoursesModule } from './courses/courses.module';
import { TrailsModule } from './trails/trails.module';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    InstructorsModule,
    LessonsModule,
    CoursesModule,
    TrailsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
