import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { GithubServiceService } from './github-service.service';
import { GithubRepos } from './shared/github-repos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'weather-around-the-globe';
  cityName: string

  weatherForecast:any = []
  currentWeather: any
  showWeatherSection = false

  constructor(private gitHubService: GithubServiceService, private http: HttpClient){ }

    repos: any
    
    ngOnInit() {

      this.form.valueChanges.pipe(
        debounceTime (1000),
      ).subscribe(
       ({request}:any) => { 
         
        console.log(`AAA`)
        const url = `https://api.openweathermap.org/geo/1.0/direct?q=${request}&limit=1&appid=2d12e5f75479307f2533681126bd90cd`
         this.http.get(url).subscribe((d:any) => 
           {
             this.cityName = `${request[0].toUpperCase()}${request.slice(1, request.length)}`

           console.log(d, `get url`)
           const {lat, lon} = d[0] 
           const cnt = 10
           const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt}&appid=2d12e5f75479307f2533681126bd90cd`

           console.log(`lat, lon`, lat, lon)

             this.http.get(url2).subscribe((weather1:any) => 
               { 
                 this.currentWeather = weather1
                 this.showWeatherSection = true
                 var cnt2 = 25
                 const url3 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt2}&appid=2d12e5f75479307f2533681126bd90cd`
                 this.http.get(url3).subscribe((weather2:any) => this.weatherForecast = weather2)
               }
             )
           }
     )
    }
      )  
    }  

    form = new FormGroup({
      request: new FormControl('', Validators.minLength(3)),
    });
  
    get request(): any {
      return this.form.get('request');
    }
  
    onSubmit(): void {
      console.log(`form`, this.form.value)
      this.gitHubService.get(this.form.value).subscribe(
        (d: any) => { this.repos = d['drinks'], console.log(d), console.log(`DATA by submit`, this.repos)},
      )
    }
}
