import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, concat, debounceTime, distinctUntilChanged, EMPTY, from, fromEvent, iif, merge, mergeMap, Observable, of, pipe, switchMap, tap, throwError, zip } from 'rxjs';
import { WeatherService } from './service/weather-service';
import { GithubRepos } from './shared/weatherCurrent';

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
  showModalWindow = false
  weatherStreams$: Observable<any>

  constructor(private weatherService: WeatherService, private http: HttpClient){ }

    closeModal(){
      console.log(`close modal window`)
      this.showModalWindow = true
      this.showWeatherSection = false
      console.log(`close modal window ${this.showModalWindow}`)
    }


    onError(e: any){
      console.log(`catch Error`, e)
      this.showModalWindow = true
    }

    ngOnInit() {
    //const submitStream$ = fromEvent(this.onSubmit) 
    // const errorLogging$: Observable<any> = 

     const errors$ = pipe(
       catchError(err => {
          console.log(`Caught Error, continuing ${err}`)
          //Return an empty Observable which gets collapsed in the output
          return EMPTY;
      }))
     
     const main$ = from([0, 1, 2, 3, 4, 5]).pipe(mergeMap((value) => 
          iif(() => value != 3, 
              of(value), 
              throwError(new Error("Value cannot be 3"))
        ).pipe(errors$)))

     const searchText$ = this.form.valueChanges.pipe(
        debounceTime (1200),
        distinctUntilChanged(), 
        tap(({request}):any => this.cityName = `${request[0].toUpperCase()}${request.slice(1, request.length)}`),
      )

      const getLocation$: Observable<any> = searchText$
        .pipe(switchMap((request):any => this.weatherService.getLocation(request))
      ) 

      const currentWeather$: Observable<any> = getLocation$
        .pipe(
          //tap((location:any) => { try { location[0].lat } catch(e){ this.onError(0) }}),
          tap(_ => console.log(`getCurrentWeather in Stream`)),
          switchMap(location => this.weatherService.getCurrentWeather(location)),
          catchError(err => {
            console.log(`Caught Error, continuing ${err}`)
            //Return an empty Observable which gets collapsed in the output
            return EMPTY;
          }),
          //catchError(_ => of('no more requests!!!'))
      )

      const weatherForecst$: Observable<any> = getLocation$
       .pipe(
          tap(_ => console.log(`getForecast in Stream`)),
          switchMap(location => this.weatherService.getForecast(location))
      )
      this.weatherStreams$ = zip(currentWeather$, weatherForecst$) 
      this.weatherStreams$.subscribe(([weather, forecast]):any => {
          this.currentWeather = weather,
          this.weatherForecast = forecast, 
          this.showWeatherSection = true
          this.showModalWindow = false
      })
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
