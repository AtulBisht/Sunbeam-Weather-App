import { Injectable } from '@angular/core';

@Injectable()
export class ShowGraphService {

  showTemp: boolean = false;
  showWind: boolean = false;
  showHumid: boolean = false;
  showPressure: boolean = false;
  
  constructor() { }

  showGraphTemp(key: string) {
    this.showTemp = !this.showTemp;
    this.showWind = false;
    this.showHumid = false;
    this.showPressure = false;

  }

  showGraphWind(key: string) {
    this.showWind = !this.showWind;
    this.showTemp = false;
    this.showHumid = false;
    this.showPressure = false;
  }

  showGraphHumidity(key: string) {
    this.showHumid = !this.showHumid;
    this.showTemp = false;
    this.showWind = false;
    this.showPressure = false;

  }
  showGraphPressure(key: string) {
    this.showPressure = !this.showPressure;
    this.showTemp = false;
    this.showWind = false;
    this.showHumid = false;

  }

}
