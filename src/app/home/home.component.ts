import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from '../weather/weather-api.service';
import { CitiesService } from '../cities/cities.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [WeatherApiService, CitiesService]
})
export class HomeComponent {

  constructor(private store: Store<any>, private weatherApiService: WeatherApiService, private cities: CitiesService) { }
  citiesList: string[] = this.cities.bigCities;

  city: string = 'berlin';
  currentWeather: any;

  ngOnInit() {
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.currentWeather = weather;
    });
  }

  handleCityInput(event: Event, city: string) {
    event.preventDefault();
    this.city = city;
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.currentWeather = weather;
    });
  }

}