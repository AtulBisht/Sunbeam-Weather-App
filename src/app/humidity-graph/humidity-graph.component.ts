import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { NgProgress } from 'ngx-progressbar';
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
  loading: boolean;

  constructor(
    private fs: ForecastService,
    private progress: NgProgress,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    if (sessionStorage.getItem('city') != null) {
      this.progress.start();
      this.cityForecast();
      this.loading = true;
    } else if ((sessionStorage.getItem('longitude') && sessionStorage.getItem('latitude') != null)) {
      this.progress.start();
      this.localForecast();
      this.loading = true;
    }
  }

  localForecast() {
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          // Chart
          this.timeValue.splice(0, this.timeValue.length);
          this.humidityValue.splice(0, this.humidityValue.length);
          // Get Chart/Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const humidity = (data.list[i].main.humidity);

            this.timeValue.push(time);
            this.humidityValue.push(humidity);
          }
          // humidity Graph
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
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {
          this.progress.done();
          this.loading = false;
          // clean previous data
          this.timeValue.splice(0, this.timeValue.length);
          this.humidityValue.splice(0, this.humidityValue.length);
          // Get Graph Values
          for (let i = 0; i < data.list.length; i++) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const humidity = (data.list[i].main.humidity);

            this.timeValue.push(time);
            this.humidityValue.push(humidity);
          }
          // Humidity Graph
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

  // Humidity Graph
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
