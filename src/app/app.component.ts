import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { concat, debounceTime, distinctUntilChanged, fromEvent, merge, Observable, switchMap, tap, zip } from 'rxjs';
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
  weatherStreams$: Observable<any>

  constructor(private gitHubService: GithubServiceService, private http: HttpClient){ }

    ngOnInit() {

    //const submitStream$ = fromEvent(this.onSubmit) 

     const searchText$ = this.form.valueChanges.pipe(
        debounceTime (1200),
        distinctUntilChanged(), 
        tap(({request}):any => this.cityName = `${request[0].toUpperCase()}${request.slice(1, request.length)}`),
      )

      const getLocation$: Observable<any> = searchText$
        .pipe(switchMap((request):any => this.gitHubService.getLocation(request))
      ) 

      const currentWeather$: Observable<any> = getLocation$
        .pipe(
          tap(_ => console.log(`getCurrentWeather in Stream`)),
          switchMap(location => this.gitHubService.getCurrentWeather(location))
      )

      const weatherForecst$: Observable<any> = getLocation$
       .pipe(
          tap(_ => console.log(`getForecast in Stream`)),
          switchMap(location => this.gitHubService.getForecast(location))
      )
      this.weatherStreams$ = zip(currentWeather$, weatherForecst$) 
      this.weatherStreams$.subscribe(([weather, forecast]):any => {
          this.currentWeather = weather,
          this.weatherForecast = forecast, 
          this.showWeatherSection = true
      })
    }  

    ngOnDestroy(){
      //this.weatherStreams$
    }

    form = new FormGroup({
      request: new FormControl('', Validators.minLength(3)),
    });
  
    get request(): any {
      return this.form.get('request');
    }
  
    onSubmit(): void {
      console.log(`form`, this.form.value, this.weatherStreams$)

     /* this.gitHubService.get(this.form.value).subscribe(
        (d: any) => { 
          //this.repos = d['drinks'], 
          console.log(d) 
          //console.log(`DATA by submit`, this.repos)
        },
      )*/
    }
}
