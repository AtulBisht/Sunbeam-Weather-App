import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import { Forecast } from '../models/forecast';
import { ShowForecastService } from '../service/show-forecast.service';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {

  fiveDaysForecast: Forecast[] = [];
  city: string;
  constructor(
    private fs: ForecastService,
    private showForecastService: ShowForecastService,
    private http: Http,
    public alertService: AlertService) { }

  ngOnInit() {

    if (sessionStorage.getItem('city') != null) {
      this.cityForecast();
    }
    else {
      this.localForecast();
    }
  }

  localForecast() {
    //Local Forecast
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {
          this.city = data.city.name;
          //Five Days Forecast
          this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);

          const fLen = data.list.length;
          for (let i = 0; i < fLen; i = i + 8) {

            const temporary = new Forecast(
              data.list[i].dt = moment.unix(data.list[i].dt).format('LL'),
              data.list[i].dt_txt,
              data.list[i].weather[0].icon,
              data.list[i].main.temp,
              data.list[i].main.humidity,
              data.list[i].main.temp_max,
              data.list[i].main.temp_min,
              data.list[i].weather[0].description,
              data.list[i].rain,
              data.list[i].wind.speed,
              data.list[i].clouds.all,
              data.list[i].main.pressure)

            this.fiveDaysForecast.push(temporary)
          }
        },
        error => {

          if (error.status === 0) {

            console.log('service down ', error);

          } else {

            console.log('error in response ', error);
            this.alertService.error(error.statusText);
          }
          console.log('error', error);
        }
      );
  }

  cityForecast() {

    //City Forecast
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {

          this.city = data.city.name;
          //Five Days Forecast
          this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);

          const fLen = data.list.length;

          for (let i = 0; i < fLen; i = i + 8) {

            const temporary = new Forecast(
              data.list[i].dt = moment.unix(data.list[i].dt).format('LL'),
              data.list[i].dt_txt,
              data.list[i].weather[0].icon,
              data.list[i].main.temp,
              data.list[i].main.humidity,
              data.list[i].main.temp_max,
              data.list[i].main.temp_min,
              data.list[i].weather[0].description,
              data.list[i].rain,
              data.list[i].wind.speed,
              data.list[i].clouds.all,
              data.list[i].main.pressure)

            this.fiveDaysForecast.push(temporary);
          }
        },
        error => {

          if (error.status === 0) {
            console.log('service down ', error);
          } else {

            console.log('error in response ', error);
            this.alertService.error(error.statusText);
          }
          console.log('error', error);
        }
      );
  }
}
