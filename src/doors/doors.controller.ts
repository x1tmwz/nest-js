import { Controller, Post, Body } from '@nestjs/common';
import { DoorsService } from './doors.service';
import { CreateDoorDto } from './dto/create-door.dto';
import { UpdateDoorDto } from './dto/update-door.dto';

@Controller('doors')
export class DoorsController {
  constructor(private readonly doorsService: DoorsService) { }

  @Post()
  create() {
    const doors = [
      { name: "Door 1" },
      { name: "Door 2" },
      { name: "Door 3" },
      { name: "Door 4" },
      { name: "Door 5" },
      { name: "Door 6" },
      { name: "Door 7" },
    ]
    return this.doorsService.createMany(doors);
  }

}
