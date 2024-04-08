import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getCurrentWeather(country: string) {
    const apiUrl = environment.apiUrl + `forecast.json?key=${environment.api_key}&q=${country}&days=7&aqi=no&alerts=no`;
    return this.http.get<any>(apiUrl);
  }

}
