import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnChanges {

  @Input() currentWeather:any; 
  @Input() cityName:any; 

  weather: any
  periodOfDay: any
  weatherIcons: any

  constructor() { 
    /*this.weatherIcons = {
      [`${this.periodOfDay}-Clear`]: `wi-${this.periodOfDay}-${this.periodOfDay === 'day' ? 'sunny' : 'clear'}`,
      [`${this.periodOfDay}-Clouds`]: `wi-${this.periodOfDay}-cloudy`,
      [`${this.periodOfDay}-${this.weather.main}`]: `wi-${this.periodOfDay}-rain`,//${this.weather.main}`
    }*/
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentWeather = {}
    if(!changes['currentWeather']) return 
    this.currentWeather = changes['currentWeather']['currentValue']
    console.log(`current weather Changes`, changes)
    console.log(`current weather`, this.currentWeather)
    this.weather = this.currentWeather , console.log(`weather`, this.currentWeather)
    this.periodOfDay = this.currentWeather['dt']-this.currentWeather['sys']['sunset'] <= 0 ? 'day' : 'night'
    this.weather = {
      main: this.currentWeather['weather'][0]['main'],
      desc: this.currentWeather['weather'][0]['description'],
      temp: this.currentWeather['main']['temp'],
      humidity: this.currentWeather['main']['humidity'],
      pressure: this.currentWeather['main']['pressure'],
      visibility: this.currentWeather['visibility'],
      wind: {speed: this.currentWeather['wind']['speed'], deg: this.currentWeather['wind']['deg']},
      clouds: this.currentWeather['clouds']['all'],
      precipitation: ((weatherType) => {
        var val = 0
        switch(weatherType){
           case "Rain": val = this.currentWeather['rain']['1h']; break;
           case "Snow": val = this.currentWeather['snow']['1h']; break;
           default: val = 0;
          }
          return val
         })(this.currentWeather['weather'][0]['main']),
      /*rain: this.currentWeather['weather'][0]['main'] =='Rain' ? this.currentWeather['rain']['1h'] : 0,
      snow: this.currentWeather['weather'][0]['main'] =='Snow' ? this.currentWeather['snow']['1h'] : 0,*/
      sunrise: this.currentWeather['sys']['sunrise'],
      sunset: this.currentWeather['sys']['sunset'],
      currentDayTime: this.currentWeather['dt']
     }
     this.weatherIcons = {
       [`${this.periodOfDay}-${this.weather.main}`]: `wi-${this.periodOfDay}-${this.weather.main.toLowerCase()}`,
       [`${this.periodOfDay}-Clear`]: `wi-${this.periodOfDay}-${this.periodOfDay === 'day' ? 'sunny' : 'clear'}`,
       [`${this.periodOfDay}-Clouds`]: `wi-${this.periodOfDay}-cloudy`,
     }
       console.log(`weatherIcon`, this.weatherIcons[`${this.periodOfDay}-${this.weather.main}`])
  }
}
