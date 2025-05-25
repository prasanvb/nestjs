import { Injectable } from '@nestjs/common';
import { PowerService } from '../power.service';

@Injectable()
export class RegulatorService {
  powerService: PowerService;

  constructor(powerService: PowerService) {
    this.powerService = powerService;
  }

  passPower() {
    console.log('powerSerive method called', this.powerService.supplyPower(10));
  }
}
