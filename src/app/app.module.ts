import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule, BrowserXhr } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { ChartModule } from 'angular2-chartjs';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CurrentComponent } from './current/current.component';
import { ChartComponent } from './chart/chart.component';
import { AlertComponent } from './directives/alert.component';
import { TempGraphComponent } from './temp-graph/temp-graph.component';
import { WindGraphComponent } from './wind-graph/wind-graph.component';

import { HourlyComponent } from './hourly/hourly.component';
import { MapComponent } from './map/map.component';
import { ForecastComponent } from './forecast/forecast.component';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatSliderModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatGridListModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { WeatherService } from './service/weather.service';
import { AlertService } from './service/alert.service';
import { ShowGraphService } from './service/show-graph.service';
import { ForecastService } from './service/forecast.service';
import { AgmCoreModule } from '@agm/core';
import { HumidityGraphComponent } from './humidity-graph/humidity-graph.component';
import { PressureGraphComponent } from './pressure-graph/pressure-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CurrentComponent,
    ChartComponent,
    AlertComponent,
    TempGraphComponent,
    WindGraphComponent,
    HourlyComponent,
    MapComponent,
    ForecastComponent,
    HumidityGraphComponent,
    PressureGraphComponent,

  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    routing,
    ChartModule,
    NgProgressModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCzD9phXc7MIN5hQgQ2w_lPMuRxyIFIHzI'
    }),
  ],
  providers: [
    WeatherService,
    ForecastService,
    AlertService,
    ShowGraphService, {
      provide: BrowserXhr,
      useClass: NgProgressBrowserXhr
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
