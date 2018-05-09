import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { ForecastService } from '../service/forecast.service';
import { CurrentWeather } from '../models/current-weather';
import { Forecast } from '../models/forecast';
import { ShowForecastService } from '../service/show-forecast.service';
import { AlertService } from '../service/alert.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {

  myCityForecast: Forecast[] = [];
  constructor(
    private ws: WeatherService,
    private fs: ForecastService,
    private showWeatherForecast: ShowForecastService,
    private alertService: AlertService,
    private http: Http) { }

  ngOnInit() {

    if (sessionStorage.getItem('city') != null) {
      this.cityForecast();
    }
    else {
      this.localForecast();
    }

  }

  localForecast() {

    //local Forecast
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {

          //local Hourly Forecast
          this.myCityForecast.splice(0, this.myCityForecast.length);

          const lLen = data.list.length - 34;

          for (let i = 0; i < lLen; i++) {

            const temporary = new Forecast(
              data.list[i].dt_txt,
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

            this.myCityForecast.push(temporary);
          }
          console.log("My Local Forecast", this.myCityForecast);
        },
        error => {

          if (error.status === 0) {
            console.log('service down ', error);
          }
          else {
            console.log('error in response ', error);
            this.alertService.error(error.statusText);

          }
          console.log('error', error);
        });
  }

  cityForecast() {
    //City Forecast 
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {

          console.log(data);

          //local Hourly Forecast
          this.myCityForecast.splice(0, this.myCityForecast.length);

          const lLen = data.list.length - 34;

          for (let i = 0; i < lLen; i++) {

            const temporary = new Forecast(
              data.list[i].dt_txt,
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

            this.myCityForecast.push(temporary);
          }
          console.log("My City Forecast", this.myCityForecast);
        },
        error => {
          if (error.status === 0) {
            console.log('service down ', error);
          }
          else {
            console.log('error in response ', error);
            this.alertService.error(error.statusText);
          }
          console.log('error', error);
        });
  }

}


