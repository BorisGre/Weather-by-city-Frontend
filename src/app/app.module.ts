import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

//import { GithubSearchService } from './service/github-search-service';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponentComponent } from './form-component/form-component.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponentComponent,
    WeatherForecastComponent,
    CurrentWeatherComponent,
    ModalWindowComponent,
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
 