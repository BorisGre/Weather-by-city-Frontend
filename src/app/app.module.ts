import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalWindowComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  // providers: [GithubSearchService],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 