import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ForecastService {

  city: string;
  apiKey = environment.apiKey;
  lat: string;
  lon: string;

  constructor(private http: Http) { }

  public localForecast(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    sessionStorage.setItem('latitude', this.lat);
    sessionStorage.setItem('longitude', this.lon);
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=metric')
      .map((response: Response) => response.json());
  }

  public cityForecast(city) {
    this.city = city;
    sessionStorage.setItem('city', this.city);
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + this.apiKey + '&units=metric')
      .map((response: Response) => response.json());
  }

}

