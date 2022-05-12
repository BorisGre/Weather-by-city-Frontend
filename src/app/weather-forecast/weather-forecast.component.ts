import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit, OnChanges {

  @Input() weatherForecast: any;
  
  forecastArray: any = []//3 entries = 3 days
  constructor() { }

   ngOnInit(): void {}
   
   ngOnChanges(changes: SimpleChanges): void {
     this.weatherForecast = changes['weatherForecast']['currentValue']
     /*console.log(`changes`, changes)
     console.log(`forecast`, this.weatherForecast.list)*/
     var dateTimeArray: number[] =[]
     var tempMinArray:number[] = []
     var tempMaxArray:number[] = []
     var humidityArray:number[] = []
     var pressureArray:number[] = []
     var windDegArray:number[] = []
     var windSpeedArray:number[] = []
     var minTemp: number
     var maxTemp: number
     var avgTemp: number
     var minHumidity: number
     var maxHumidity: number
     var avgHumidity: number
     var minPressure: number
     var maxPressure: number
     var avgPressure: number
     var minWindSpeed: number
     var maxWindSpeed: number
     var avgWindSpeed: number
     var avgWindDirection: number 
     var dateTime: number

     this.forecastArray = []//clear Array
     this.weatherForecast?.list?.splice(1, this.weatherForecast.list.length).forEach((el:any, index: number) => { 
     
       if((index + 1) % 8 == 0){                          
   
         minTemp = Math.min(...tempMinArray)
         maxTemp = Math.max(...tempMaxArray) 
         avgTemp = (minTemp + maxTemp)/2
 
         minHumidity = Math.min(...humidityArray)
         maxHumidity = Math.max(...humidityArray)
         avgHumidity = (minHumidity + maxHumidity)/2
 
         minPressure = Math.min(...pressureArray)
         maxPressure = Math.max(...pressureArray)
         avgPressure = (minPressure + maxPressure)/2
 
         minWindSpeed = Math.min(...windSpeedArray)
         maxWindSpeed = Math.max(...windSpeedArray)
         avgWindSpeed = (minWindSpeed + maxWindSpeed)/2
 
         avgWindDirection = (windDegArray.reduce((prev, curr) => prev+curr,0))/(windDegArray.length)
 
         dateTime = (dateTimeArray.reduce((prev, curr) => prev+curr,0))/(dateTimeArray.length) 
 
         
         this.forecastArray.push({dateTime, minTemp, maxTemp, avgTemp, minHumidity, maxHumidity, avgHumidity, 
           minPressure, maxPressure, avgPressure, minWindSpeed, maxWindSpeed, avgWindSpeed, avgWindDirection
         })
 
         dateTimeArray = []
         tempMinArray = []
         tempMaxArray = []
         humidityArray = []
         pressureArray = []
         windSpeedArray = []
         windDegArray = []
       }

         dateTimeArray.push(el.dt)
         tempMinArray.push(el.main.temp_min)
         tempMaxArray.push(el.main.temp_max)
         humidityArray.push(el.main.humidity)
         pressureArray.push(el.main.pressure)
         windSpeedArray.push(el.wind.speed)
         windDegArray.push(el.wind.deg)
     })
    
     var avgTemp = (Math.max(...tempMaxArray) + Math.min(...tempMinArray))/2
 
     /*console.log(`minTemp`, tempMinArray, Math.min(...tempMinArray))
     console.log(`maxTemp`, tempMaxArray, Math.max(...tempMaxArray))
     console.log(`avg Temp`, avgTemp) 
     console.log(`forecast array`, this.forecastArray)
 
     console.log(`weather forecast`, this.weatherForecast)*/
   }
}
