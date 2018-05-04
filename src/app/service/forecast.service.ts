import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';
import 'rxjs/Rx';
import { Forecast } from '../class/forecast';
import { MatInkBar } from '@angular/material';
import { AlertService } from '../service/alert.service';

@Injectable()
export class ForecastService {

  location
  loading: boolean;
  myCityForecast: Forecast[] = [];
  forecast: Forecast[] = [];
  fiveDaysForecast: Forecast[] = [];

  Chart: string;
  Value: any;
  Option: any;

  tempChart: string;
  tempValues: any;
  tempOptions: any;

  windChart: string;
  windValues: any;
  windOptions: any;

  humidityChart: string;
  humidityValues: any;
  humidityOptions: any;

  pressureChart: string;
  pressureValues: any;
  pressureOptions: any;

  tempValue = [];
  timeValue = [];
  windValue = [];
  pressureValue = [];
  humidityValue = [];

  constructor(private http: Http, public alertService: AlertService) { }



  public localForecast() {

    window.navigator.geolocation.getCurrentPosition((pos) => {

      console.log("success");

      // this.loading = true;
      this.location = pos.coords;

      const lat = this.location.latitude;
      const lon = this.location.longitude;

      return this.http.get('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=25a84d6eb510a6e0dc95c703507e31a6&units=metric')
        .map((response: Response) => response.json())
        .subscribe(
          (data) => {

            console.log(data);

            //Chart
            for (let i = 0; i < data.list.length - 30; i++) {

              const temp = data.list[i].main.temp;
              const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
              const wind = data.list[i].wind.speed;
              const humidity = data.list[i].main.humidity;
              const pressure = (data.list[i].main.pressure);

              this.tempValue.push(temp);
              this.timeValue.push(time);
              this.windValue.push(wind);
              this.pressureValue.push(pressure);
              this.humidityValue.push(humidity);
            }

            //Temp Wind Humidity Graph
            this.getTWHChartData(this.timeValue, this.tempValue, this.windValue, this.humidityValue);

            //Temperature Graph
            this.getTChart(this.timeValue, this.tempValue);

            //Wind Graph
            this.getWChart(this.timeValue, this.windValue);

            //Humidity Graph
            this.getHChart(this.timeValue, this.humidityValue);

            //Pressure Graph
            this.getPChart(this.timeValue, this.pressureValue);


            //local Hourly Forecast
            this.myCityForecast.splice(0, this.myCityForecast.length);

            for (let i = 0; i < data.list.length - 33; i++) {

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

            //Five Days Forecast
            this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);
            for (let i = 0; i < data.list.length; i = i + 8) {

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
    })

  }

  public cityForecast(city) {

    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=25a84d6eb510a6e0dc95c703507e31a6&units=metric')
      .map((response: Response) => response.json())
      .subscribe(
        (data) => {

          this.loading = false;
          console.log(data);


          //Temp Wind Graph
          for (let i = 0; i < data.list.length - 30; i++) {

            const temp = data.list[i].main.temp;
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const wind = data.list[i].wind.speed;
            const humidity = data.list[i].main.humidity;
            const pressure = (data.list[i].main.pressure);

            this.tempValue.push(temp);
            this.timeValue.push(time);
            this.windValue.push(wind);
            this.pressureValue.push(pressure);
            this.humidityValue.push(humidity);
          }

          //Temp Wind Humidity Graph
          this.getTWHChartData(this.timeValue, this.tempValue, this.windValue, this.humidityValue);

          //Temperature Graph
          this.getTChart(this.timeValue, this.tempValue);

          //Wind Graph
          this.getWChart(this.timeValue, this.windValue);

          //Humidity Graph
          this.getHChart(this.timeValue, this.humidityValue);

          //Pressure Graph
          this.getPChart(this.timeValue, this.pressureValue);

          //city hourly Forecast
          this.myCityForecast.splice(0, this.myCityForecast.length);

          for (let i = 0; i < data.list.length - 33; i++) {

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

          //Five Days Forecast
          this.fiveDaysForecast.splice(0, this.fiveDaysForecast.length);
          for (let i = 0; i < data.list.length; i = i + 8) {

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


  //Time Wind Chart
  getTWHChartData(labelTime, tempValues, windValues, humidityValue) {
    this.Chart = 'line';
    this.Value = {
      labels: labelTime,
      datasets: [
        {
          label: 'Temperature',
          data: tempValues,
          backgroundColor: 'rgb(249,75,62)',
          fill: false,
        },
        {
          label: 'Wind',
          data: windValues,
          backgroundColor: 'rgb(62,168,249)',
          fill: false,

        },
        {
          label: 'Humidity',
          data: humidityValue,
          backgroundColor: 'rgb(62,249,124)',
          fill: false,
        }
      ]
    };
    this.Option = {
      title: {
        display: true,
        text: 'TEMPERATURE - WIND - PRESSURE GRAPH'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

  }

  //Temp Graph 
  getTChart(time, value) {
    this.tempChart = 'line';
    this.tempValues = {
      labels: time,
      datasets: [
        {
          label: 'Temprature',
          data: value,
          backgroundColor: 'rgb(249,75,62)',
          fill: false,
        }
      ]
    };
    this.tempOptions = {
      title: {
        display: true,
        text: 'TEMPERATURE GRAPH'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  //Wind Graph
  getWChart(time, value) {
    this.windChart = 'line';
    this.windValues = {
      labels: time,
      datasets: [
        {
          label: 'Wind',
          data: value,
          backgroundColor: 'rgb(62,168,249)',
          fill: false,
        }
      ]
    };
    this.windOptions = {
      title: {
        display: true,
        text: 'WIND SPEED GRAPH'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  //Humidity Graph
  getHChart(time, value) {
    this.humidityChart = 'line';
    this.humidityValues = {
      labels: time,
      datasets: [
        {
          label: 'Humidity',
          data: value,
          backgroundColor: 'rgb(62,249,124)',
          fill: false,
        }
      ]
    };
    this.humidityOptions = {
      title: {
        display: true,
        text: 'HUMIDITY GRAPH'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  //Pressure Graph
  getPChart(time, value) {
    this.pressureChart = 'line';
    this.pressureValues = {
      labels: time,
      datasets: [
        {
          label: 'Pressure',
          data: value,
          backgroundColor: 'rgb(233,243,86)',
          fill: false,
        }
      ]
    };
    this.pressureOptions = {
      title: {
        display: true,
        text: 'PRESSURE GRAPH'
      },
      legend: {
        display: true
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

}
