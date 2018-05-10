import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../service/forecast.service';
import * as moment from 'moment';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-pressure-graph',
  templateUrl: './pressure-graph.component.html',
  styleUrls: ['./pressure-graph.component.scss']
})
export class PressureGraphComponent implements OnInit {

  pressureChart: string;
  pressureValues: any;
  pressureOptions: any;

  timeValue = [];
  pressureValue = [];


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
          //Chart
          this.timeValue.splice(0, this.timeValue.length);

          this.pressureValue.splice(0, this.pressureValue.length);

          //Get Chart/Graph Values
          const gLen = data.list.length - 30;
          for (let i = 0; i < gLen; i++) {

            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const pressure = (data.list[i].main.pressure);
            this.timeValue.push(time);
            this.pressureValue.push(pressure);

          }

          //Pressure Graph
          this.getPChart(this.timeValue, this.pressureValue);
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
          this.pressureValue.splice(0, this.pressureValue.length);


          //Get Chart/Graph Values
          const gLen = data.list.length - 30;
          for (let i = 0; i < gLen; i++) {
            const time = moment(data.list[i].dt_txt).format('Do MMMM, h:mm a');
            const pressure = (data.list[i].main.pressure);

            this.timeValue.push(time);
            this.pressureValue.push(pressure);

          }

          this.getPChart(this.timeValue, this.pressureValue);

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


  //Pressure Graph
  getPChart(time, value) {
    this.pressureChart = 'horizontalBar';
    this.pressureValues = {
      labels: time,
      datasets: [
        {
          label: 'Pressure',
          data: value,
          backgroundColor: 'rgb(153,153,255)',
          fill: false,
        }
      ]
    };
    this.pressureOptions = {
      title: {
        display: true,
        text: 'PRESSURE GRAPH ( hpa )'
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