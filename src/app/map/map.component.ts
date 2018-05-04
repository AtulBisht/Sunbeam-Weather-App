import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat: number;
  lon: number;

  constructor(private ws: WeatherService) { }

  ngOnInit() {
    
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lon = position.coords.longitude;
    //   });
    // } else {
    //   this.lat = 28.65;
    //   this.lon = 77.22;
    // }
  }

}
