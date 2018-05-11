import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-humidity-graph',
  templateUrl: './humidity-graph.component.html',
  styleUrls: ['./humidity-graph.component.scss']
})
export class HumidityGraphComponent implements OnInit {

  humidityChart: string;
  humidityValues: any;
  humidityOptions: any;

  timeValue = [];
  humidityValue = [];

  constructor(
    private fs: ForecastService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {

    if (sessionStorage.getItem('city') != null) {
      this.cityForecast();
    }
    else if ((sessionStorage.getItem('longitude') && sessionStorage.getItem('latitude') != null)) {
      this.localForecast();
    }

  }

  localForecast() {

    //Local Forecast
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {

          //Chart
          this.timeValue.splice(0, this.timeValue.length);
          this.humidityValue.splice(0, this.humidityValue.length);

          //Get Chart/Graph Values
          for (let i = 0; i < data.list.length; i++) {
            if (i < 10) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const humidity = (data.list[i].main.humidity);

            this.timeValue.push(time);
            this.humidityValue.push(humidity);
            }
          }

          //humidity Graph
          this.getHChart(this.timeValue, this.humidityValue);
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

  cityForecast() {

    //City Forecast
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {

          //Temp Wind Graph
          this.timeValue.splice(0, this.timeValue.length);
          this.humidityValue.splice(0, this.humidityValue.length);

          //Get Chart/Graph Values
          for (let i = 0; i < data.list.length; i++) {
            if (i < 10) {
              const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
              const humidity = (data.list[i].main.humidity);

              this.timeValue.push(time);
              this.humidityValue.push(humidity);
            }

          }
          //Humidity Graph
          this.getHChart(this.timeValue, this.humidityValue);

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
        text: 'HUMIDITY GRAPH ( % )'
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