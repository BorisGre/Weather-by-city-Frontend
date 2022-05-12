import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from "rxjs/operators";

import { GithubRepos } from './shared/github-repos';

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

  constructor(private http: HttpClient) { 
    
  }
   repos = []
   data = {}

  fetch({request}: any) {
    console.log(`request`, request)
    //const url = `http://127.0.0.1:8000/search?q=${request}` //"https://jsonplaceholder.typicode.com/posts"
    //const url = `http://127.0.0.1:8000/search?q=${request}`
    //const url = `http://127.0.0.1:8000/search?q=${request}` //`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request}`
     
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${request}&limit=1&appid=2d12e5f75479307f2533681126bd90cd`
    let out
    this.http.get(url).subscribe((d:any) => 
      {
       const {lat, lon} = d[0] 
       const cnt = 10
       const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt}&appid=2d12e5f75479307f2533681126bd90cd`
        this.http.get(url2).subscribe((w:any) => 
           { out = w , console.log(`weather`, w)}
        ).unsubscribe()
      }
    ///console.log(`data`, d[0].lon, d[0].lat),
    ).unsubscribe()
    return out
     
    //`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&units=metric&cnt=${cnt}&appid=2d12e5f75479307f2533681126bd90cd`
    //const a = 
    //return this.http.get(url).pipe(tap(data => console.log('rx', data)))
    //console.log(a)
    //const a = 
    
    
    /*this.http.get(url).subscribe(
        d => { this.data = d, console.log(d), console.log(`DATA`, this.data)},
        //this.data = d,
        tap(_ => console.log(`DATA`, this.data))
        
        //of(d),
        //tap(_ => console.log(`githubService`))
        //data => this.repos = data.items,
    );*/
    

    return this.http.get(url) //this.data
    //return this.repos

    //return this.http.get(url).pipe(
    //  tap(_ => console.log('test'))
    //);
    //return repos;
                              //.map((response: Response) => <IUser[]>response.json());
  }

  get({request}: any) {
    console.log(`get service`, request)
    //let a = Math.round(Math.random())
    const url = `http://127.0.0.1:8000/search?q=${request}`//`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${request}`
    return this.http.get(url)//(a == 0 ? ['s', 't', 'd', 'a'] : ['Q', 'W', 'U', 'R'])
  }
}
