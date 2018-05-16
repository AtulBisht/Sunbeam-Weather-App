import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import { WeatherService } from '../service/weather.service';
import { CitiesWeather } from '../models/cities-weather';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: string;
  lon: string;
  icon: string;
  title: string;
  temperature: string;
  city: string;
  loading: boolean;
  citiesWeather: CitiesWeather[] = [];

  constructor(
    private fs: ForecastService,
    private ws: WeatherService) { }

  ngOnInit() {

    if (sessionStorage.getItem('city') != null) {
      this.loading = true;

      this.ws.cityWeather(this.ws.city)
        .subscribe(
          (data) => {

            this.loading = false;

            this.lat = data.coord.lat;
            this.lon = data.coord.lon;

            this.icon = data.weather[0].icon;
            this.title = data.weather[0].description;
            this.city = data.name;
            this.temperature = data.main.temp;

            this.ws.citiesWeather(this.lat, this.lon)
              .subscribe(
                (data) => {

                  this.loading = false;
                  console.log("weather around given city", data);

                  //clean previous data
                  this.citiesWeather.splice(0, this.citiesWeather.length);

                  //show weather info around city
                  for (let i = 0; i < data.list.length; i++) {

                    const temporary = new CitiesWeather(
                      data.list[i].name,
                      data.list[i].weather[0].icon,
                      data.list[i].main.temp,
                      data.list[i].weather[0].description,
                    )
                    this.citiesWeather.push(temporary);
                  }
                });
          });
    }
    else {

      this.lat = this.ws.lat;
      this.lon = this.ws.lon;

      this.loading = true;

      this.ws.localWeather(this.ws.lat, this.ws.lon)
        .subscribe(
          (data) => {

            this.loading = false;

            this.icon = data.weather[0].icon;
            this.title = data.weather[0].description;
            this.city = data.name;
            this.temperature = data.main.temp

            this.ws.citiesWeather(this.lat, this.lon)
              .subscribe(
                (data) => {

                  this.loading = false;
                  console.log("weather around current city", data);

                  //clean previous data
                  this.citiesWeather.splice(0, this.citiesWeather.length);

                  //show weather info around city
                  for (let i = 0; i < data.list.length; i++) {
                    const temporary = new CitiesWeather(
                      data.list[i].name,
                      data.list[i].weather[0].icon,
                      data.list[i].main.temp,
                      data.list[i].weather[0].description,
                    )
                    this.citiesWeather.push(temporary);

                  }
                });
          });
    }
  }
}