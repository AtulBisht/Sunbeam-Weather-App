import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';

@Component({
  selector: 'app-humidity-graph',
  templateUrl: './humidity-graph.component.html',
  styleUrls: ['./humidity-graph.component.scss']
})
export class HumidityGraphComponent implements OnInit {

  humidityChart: string;
  humidityValues: any;
  options: any;

  constructor(private fs: ForecastService) { }

  ngOnInit() {

  }


}
