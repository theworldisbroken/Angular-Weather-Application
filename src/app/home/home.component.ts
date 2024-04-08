import { Component, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from '../weather/weather-api.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [WeatherApiService]
})
export class HomeComponent {

  constructor(private store: Store<any>, private weatherApiService: WeatherApiService) { }
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  country: string = 'berlin';
  currentWeather: any;

  ngOnInit() {
    this.weatherApiService.getCurrentWeather(this.country).subscribe((weather: any) => {
      this.currentWeather = weather;
    });
  }

  handleCountryInput(event: Event, country: string) {
    event.preventDefault();
    this.country = country;
    this.weatherApiService.getCurrentWeather(this.country).subscribe((weather: any) => {
      this.currentWeather = weather;
    });
  }

}