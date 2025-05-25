import { Injectable } from '@nestjs/common';

/* Decorator that marks a class as a provider. Providers can be injected into other classes via constructor parameter injection using Nest's built-in Dependency Injection (DI) system. */
@Injectable()
export class PowerService {
  supplyPower(watts: number) {
    console.log(`Supplying power worth of ${watts} watts.`);
  }
}
