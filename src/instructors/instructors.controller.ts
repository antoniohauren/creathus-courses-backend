import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateInstructorDto, UpdateInstructorDto } from './dtos';
import { Instructor } from './entities/instructor.entity';
import { InstructorsService } from './instructors.service';

@ApiTags('instructors')
@Controller('instructors')
export class InstructorsController {
  constructor(private readonly instructorsService: InstructorsService) {}

  @ApiOkResponse({ type: Instructor })
  @Post()
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorsService.create(createInstructorDto);
  }

  @ApiOkResponse({ type: Instructor, isArray: true })
  @Get()
  findAll() {
    return this.instructorsService.findAll();
  }

  @ApiOkResponse({ type: Instructor })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instructorsService.findOne(id);
  }

  @ApiOkResponse({ type: Instructor })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstructorDto: UpdateInstructorDto,
  ) {
    return this.instructorsService.update(id, updateInstructorDto);
  }

  @ApiOkResponse({ type: Instructor })
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instructorsService.remove(id);
  }
}
