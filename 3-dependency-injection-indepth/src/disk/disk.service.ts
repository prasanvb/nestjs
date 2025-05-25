import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log('Drawing 15 watts of power to fetch data from hard disk');
    this.powerService.supplyPower(15);
    return 'data!';
  }
}
