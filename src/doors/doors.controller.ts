import { Controller, Post, Body } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) {}

  @Post()
  create(@Body() createDoorDto: CreateDoorDto) {
    return this.doorsService.create(createDoorDto);
  }
}
