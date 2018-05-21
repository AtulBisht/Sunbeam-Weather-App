import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {

  apiKey = environment.apiKey;
  lat: string;
  lon: string;
  city: string;

  constructor(private http: Http) {
  }

  public localWeather(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + this.apiKey + '&units=metric')
      .map((response: Response) => response.json());
  }

  public cityWeather(city) {
    this.city = city;
    localStorage.setItem('city', this.city);
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + this.apiKey + '&units=metric')
      .map((response: Response) => response.json());
  }

  public citiesWeather(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    return this.http.get('http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=10&appid=' + this.apiKey + '&units=metric')
      .map((response: Response) => response.json());
  }
}
