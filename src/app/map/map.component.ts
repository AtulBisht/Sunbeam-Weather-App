import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: number;
  lon: number;

  constructor(private ws: WeatherService, private http: Http) { }

  ngOnInit() {

    if (this.ws.city) {
      this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + this.ws.city + '&appid=25a84d6eb510a6e0dc95c703507e31a6&units=metric')
        .map((response: Response) => response.json())
        .subscribe(
          (data) => {
            this.lat = data.coord.lat;
            this.lon = data.coord.lon;
          });
    }
    else if (this.ws.city == 'delhi') {
      this.lat = 28.65;
      this.lon = 77.22;
    }

    else {
      this.http.get("http://ip-api.com/json")
        .map((response: Response) => response.json())
        .subscribe(
          (data) => {
            this.lat = data.lat;
            this.lon = data.lon;
          })
    }


  }

}
