import { Module } from '@nestjs/common';
import { PowerService } from './power.service';
import { RegulatorService } from './regulator/regulator.service';

@Module({
  /* By default the services of each module are private, until exported can't be accessed by other module */
  providers: [PowerService, RegulatorService],
  exports: [PowerService],
})
export class PowerModule {}
