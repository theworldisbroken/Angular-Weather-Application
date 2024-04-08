import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class WeatherApiService {

  constructor(private http: HttpClient) { }

  getCurrentWeather() {
    const apiUrl = environment.apiUrl + `current.json?key=${environment.api_key}&q=Berlin&aqi=no`;
    return this.http.get<any>(apiUrl);
  }

}
