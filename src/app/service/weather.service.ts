import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';
import 'rxjs/Rx';
import { CurrentWeather } from '../class/current-weather';
import { MatInkBar } from '@angular/material';
import { AlertService } from '../service/alert.service';

@Injectable()
export class WeatherService {

  location
  myWeather: CurrentWeather;

  constructor(private http: Http, public alertService: AlertService) { }


  public localWeather() {
    window.navigator.geolocation.getCurrentPosition((pos) => {

      console.log("success");

      this.location = pos.coords;

      const lat = this.location.latitude;
      const lon = this.location.longitude;

      return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=25a84d6eb510a6e0dc95c703507e31a6&units=metric')
        .map((response: Response) => response.json())
        .subscribe(
          (data) => {

            console.log(data);

            const date = moment.unix(data.dt).format('LL');
            const sunrise = moment.unix(data.sys.sunrise).format('h:mm A');
            const sunset = moment.unix(data.sys.sunset).format('h:mm A');

            this.myWeather = new CurrentWeather(data.name,
              data.sys.country,
              data.main.temp,
              data.main.humidity,
              data.main.pressure,
              data.weather[0].icon,
              data.clouds.all,
              data.weather[0].description,
              data.dt = date,
              data.main.temp_max,
              data.main.temp_min,
              data.sys.sunrise = sunrise,
              data.sys.sunset = sunset,
              data.coord,
              data.wind.speed,
              data.wind.deg
            );
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
    })
  }

  public cityWeather(city) {

    console.log(city);

    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=25a84d6eb510a6e0dc95c703507e31a6&units=metric')
      .map((response: Response) => response.json())
      .subscribe(
        (data) => {

          console.log(data);
          const date = moment.unix(data.dt).format('LL');
          const sunrise = moment.unix(data.sys.sunrise).format('h:mm A');
          const sunset = moment.unix(data.sys.sunset).format('h:mm A');

          this.myWeather = new CurrentWeather(data.name,
            data.sys.country,
            data.main.temp,
            data.main.humidity,
            data.main.pressure,
            data.weather[0].icon,
            data.clouds.all,
            data.weather[0].description,
            data.dt = date,
            data.main.temp_max,
            data.main.temp_min,
            data.sys.sunrise = sunrise,
            data.sys.sunset = sunset,
            data.coord,
            data.wind.speed,
            data.wind.deg
          );
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
