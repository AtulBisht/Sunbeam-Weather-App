import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';


@Component({
  selector: 'app-temp-graph',
  templateUrl: './temp-graph.component.html',
  styleUrls: ['./temp-graph.component.scss']
})
export class TempGraphComponent implements OnInit {

  tempChart: string;
  tempValues: any;
  options: any;

  constructor(private fs: ForecastService) { }


  ngOnInit() {
  }

}
