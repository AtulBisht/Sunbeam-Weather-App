import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import { Forecast } from '../class/forecast';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  constructor(private fs: ForecastService) { }

  ngOnInit() {
  }

}
