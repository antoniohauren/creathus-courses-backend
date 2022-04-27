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
import { CreateTrailDto, UpdateTrailDto } from './dtos';
import { Trail } from './entities/trail.entity';
import { TrailsService } from './trails.service';

@ApiTags('trails')
@Controller('trails')
export class TrailsController {
  constructor(private readonly trailsService: TrailsService) {}

  @ApiOkResponse({ type: Trail })
  @Post()
  create(@Body() createTrailDto: CreateTrailDto) {
    return this.trailsService.create(createTrailDto);
  }

  @ApiOkResponse({ type: Trail, isArray: true })
  @Get()
  findAll() {
    return this.trailsService.findAll();
  }

  @ApiOkResponse({ type: Trail })
  @ApiNotFoundResponse()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailsService.findOne(id);
  }

  @ApiOkResponse({ type: Trail })
  @ApiNotFoundResponse()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrailDto: UpdateTrailDto) {
    return this.trailsService.update(id, updateTrailDto);
  }

  @ApiOkResponse({ type: Trail })
  @ApiNotFoundResponse()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailsService.remove(id);
  }
}
