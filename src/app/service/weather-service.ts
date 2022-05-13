import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../shared/config';

import { GithubRepos } from '../shared/weatherCurrent';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  
  getLocation({request}: any) {
    console.log(`location`)
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${request}&limit=1&appid=${config.apiKey}`

    return this.http.get(url)
  }

  getCurrentWeather(location: any){
    console.log(`getCurrentWeather`, `locationObj`, location)
    //var lat, lon;
    var {lat, lon} = location[0] 
    /*try {
      var {lat, lon} = location[0] 
      console.log(`lat, lon`, lat, lon)
    }
      catch(e){

    }*/

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${config.apiKey}`
           
    return this.http.get(url)
  }

  getForecast(location: any){
    console.log(`getForeacast`, `locationObj`, location)
    //var lat, lon;
    var {lat, lon} = location[0] 
    /*try {
      var {lat, lon} = location[0] 
      console.log(`lat, lon`, lat, lon)
    }
      catch(e){
        throw new Error(`location not find`)
    }*/
    const cnt = config.countOfForecastPeriods
    console.log(`lat, lon`, lat, lon)

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt}&appid=${config.apiKey}`
           
    return this.http.get(url)
  }

  get({request}: any) {
    console.log(`get service`, request)
    //let a = Math.round(Math.random())
    const url = `http://127.0.0.1:8000/search?q=${request}`//`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request}`
    return this.http.get(url)//(a == 0 ? ['s', 't', 'd', 'a'] : ['Q', 'W', 'U', 'R'])
  }
}
