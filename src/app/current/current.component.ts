import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import 'rxjs/Rx';
import { NgProgress } from 'ngx-progressbar';
import { WeatherService } from '../service/weather.service';
import { ForecastService } from '../service/forecast.service';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})

export class CurrentComponent implements OnInit {

  Chart: string;
  Values: any;
  Options: any;

  constructor(private ws: WeatherService, private fs: ForecastService, public ngProgress: NgProgress) {
  }

  ngOnInit() {
    this.ngProgress.start();
    this.ws.cityWeather('delhi');
    this.fs.cityForecast('delhi');
  }

  OnClickCurrentLocation() {
    this.ngProgress.start();
    this.ws.localWeather();
    this.fs.localForecast();
  }

  onSubmit(weatherForm: NgForm) {
    this.ngProgress.start();
    this.ws.cityWeather(weatherForm.value.city);
    this.fs.cityForecast(weatherForm.value.city);
  }

}

