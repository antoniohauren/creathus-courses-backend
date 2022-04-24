import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstructorsModule } from './instructors/instructors.module';

@Module({
  imports: [ConfigModule.forRoot(), InstructorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
