import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import { Forecast } from '../models/forecast';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss']
})
export class HourlyComponent implements OnInit {

  myCityForecast: Forecast[] = [];
  city: string;
  loading: boolean;

  constructor(
    private fs: ForecastService,
    private alertService: AlertService) { }

  ngOnInit() {

    if (sessionStorage.getItem('city') != null) {
      this.cityForecast();
      this.loading = true;
    }
    else if ((sessionStorage.getItem('longitude') && sessionStorage.getItem('latitude') != null)) {
      this.localForecast();
      this.loading = true;
    }

  }

  localForecast() {

    //Local Forecast
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {

          this.loading = false;
          this.city = data.city.name;

         //clean previous data
          this.myCityForecast.splice(0, this.myCityForecast.length);

          // Hourly weather Forecast
          for (let i = 0; i < data.list.length; i++) {
            if (i < 6) {
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
          }
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

          this.loading = false;
          this.city = data.city.name;

          //clean previous data
          this.myCityForecast.splice(0, this.myCityForecast.length);
          //Hourly Weather Forecast
          for (let i = 0; i < data.list.length; i++) {
            if (i < 6) {
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
          }
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


