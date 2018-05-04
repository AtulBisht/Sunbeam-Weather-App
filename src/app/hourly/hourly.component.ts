import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ForecastService } from '../service/forecast.service';
import { CurrentWeather } from '../class/current-weather';
import { Forecast } from '../class/forecast';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {

  constructor(private ws: WeatherService, private fs: ForecastService) { }

  ngOnInit() {
  }

}
