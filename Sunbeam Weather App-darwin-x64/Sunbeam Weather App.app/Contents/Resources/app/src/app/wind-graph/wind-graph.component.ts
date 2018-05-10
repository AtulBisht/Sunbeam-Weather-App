import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { AlertService } from '../service/alert.service';


@Component({
  selector: 'app-wind-graph',
  templateUrl: './wind-graph.component.html',
  styleUrls: ['./wind-graph.component.scss']
})
export class WindGraphComponent implements OnInit {

  windChart: string;
  windValues: any;
  windOptions: any;

  timeValue = [];
  windValue = [];

  constructor(private fs: ForecastService,
    private alertService: AlertService) { }

  ngOnInit() {
    if (sessionStorage.getItem('city') != null) {
      this.cityForecast();
    }
    else if((sessionStorage.getItem('longitude')&& sessionStorage.getItem('latitude')!=null)){
      this.localForecast();
    }
  }

  localForecast() {
    this.fs.localForecast(this.fs.lat, this.fs.lon)
      .subscribe(
        (data) => {

          console.log(data);

          //Chart
          this.timeValue.splice(0, this.timeValue.length);
          this.windValue.splice(0, this.timeValue.length);

          //Get Chart/Graph Values
          const gLen = data.list.length - 30;
          for (let i = 0; i < gLen; i++) {

            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const wind = data.list[i].wind.speed;

            this.timeValue.push(time);
            this.windValue.push(wind);
          }

          //Wind Graph
          this.getWChart(this.timeValue, this.windValue);

        },
        error => {

          if (error.status === 0) {

            console.log('service down ', error);

          } else {

            console.log('error in response ', error);
            this.alertService.error(error.statusText);

          }
          console.log('error', error);
        });
  }

  cityForecast() {
    this.fs.cityForecast(this.fs.city)
      .subscribe(
        (data) => {

          console.log(data);

          //Temp Wind Graph
          this.timeValue.splice(0, this.timeValue.length);
          this.windValue.splice(0, this.timeValue.length);


          //Get Chart/Graph Values
          const gLen = data.list.length - 30;
          for (let i = 0; i < gLen; i++) {

            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const wind = data.list[i].wind.speed;


            this.timeValue.push(time);
            this.windValue.push(wind);
          }

          //Wind Graph
          this.getWChart(this.timeValue, this.windValue);
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
        text: 'WIND SPEED GRAPH ( m/s )'
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