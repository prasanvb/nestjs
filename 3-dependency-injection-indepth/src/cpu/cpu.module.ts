import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { PowerModule } from 'src/power/power.module';

@Module({
  providers: [CpuService],
  /* The `imports` array is used to import other modules that this module depends on. Once module is imported all the exported services of the imported module can be used in this module. */
  imports: [PowerModule],
  exports: [CpuService],
})
export class CpuModule {}
