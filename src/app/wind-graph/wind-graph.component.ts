import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';


@Component({
  selector: 'app-wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss']
})
export class WindGraphComponent implements OnInit {

  windChart: string;
  windValues: any;
  options: any;

  constructor(private fs: ForecastService) { }

  ngOnInit() {
  }

}
