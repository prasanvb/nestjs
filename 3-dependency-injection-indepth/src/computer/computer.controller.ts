import { CpuService } from './../cpu/cpu.service';
import { DiskService } from './../disk/disk.service';
import { Controller, Get } from '@nestjs/common';

@Controller('computer')
export class ComputerController {
  constructor(
    private diskService: DiskService,
    private cpuService: CpuService,
  ) {}

  @Get()
  run() {
    return {
      compute: this.cpuService.compute(1, 2),
      data: this.diskService.getData(),
    };
  }
}
