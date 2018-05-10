import { Component, OnInit } from '@angular/core';
import { CurrentWeather } from '../models/current-weather';
import { Forecast } from '../models/forecast';
import { WeatherService } from '../service/weather.service';
import { Router } from '@angular/router';
import { ShowGraphService } from '../service/show-graph.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(public showGraphService: ShowGraphService) { }

  ngOnInit() {
    this.showGraphService.showGraphPressure('pressureComponent');
    this.showGraphService.showGraphWind('windComponent');
    this.showGraphService.showGraphHumidity('humidityComponent');
    this.showGraphService.showGraphTemp('tempComponent');

  }

}
