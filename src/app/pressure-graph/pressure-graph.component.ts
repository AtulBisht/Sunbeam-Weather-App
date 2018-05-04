import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';

@Component({
  selector: 'app-pressure-graph',
  templateUrl: './pressure-graph.component.html',
  styleUrls: ['./pressure-graph.component.scss']
})
export class PressureGraphComponent implements OnInit {

  constructor(private fs: ForecastService) { }

  ngOnInit() {
  }

}
