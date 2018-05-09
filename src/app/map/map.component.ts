import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  apiKey = environment.apiKey;
  lat: string;
  lon: string;
  icon: string;
  title: string;

  constructor(private ws: WeatherService) { }

  ngOnInit() {

    if (this.ws.city) {
      this.ws.cityWeather(this.ws.city)
        .subscribe(
          (data) => {
            this.lat = data.coord.lat;
            this.lon = data.coord.lon;
            this.icon = data.weather[0].icon;
            this.title = data.weather[0].description;
          });
    }
    else {
      this.lat = this.ws.lat;
      this.lon = this.ws.lon;
      this.ws.localWeather(this.ws.lat, this.ws.lon)
        .subscribe(
          (data) => {
            this.icon = data.weather[0].icon;
            this.title = data.weather[0].description;
          });
    }


  }

}
