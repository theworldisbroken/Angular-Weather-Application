import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { WeatherApiService } from '../weather/weather-api.service';
import { CitiesService } from '../cities/cities.service';
import { ForecastWeatherComponent } from '../forecast-weather/forecast-weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, ForecastWeatherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [WeatherApiService, CitiesService]
})
export class HomeComponent {

  constructor(private store: Store<any>, private weatherApiService: WeatherApiService, private cities: CitiesService) { }
  citiesList: string[] = this.cities.bigCities;

  weather: any;
  cureentWeatherImage = "";
  city: string = 'berlin';

  ngOnInit() {
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weather = weather;
      this.updateWeatherImage();
    });
  }

  handleCityInput(event: Event, city: string) {
    event.preventDefault();
    this.city = city;
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weather = weather;
      this.updateWeatherImage();
    });
  }

  updateWeatherImage() {
    if (this.weather && this.weather.current && this.weather.current.condition.text) {
      if (this.weather.current.condition.text === "Sunny") {
        this.cureentWeatherImage = "../../assets/sunny.png";
      } else if (this.weather.current.condition.text === "Partly cloudy" && this.weather.current.is_day == 0) {
        this.cureentWeatherImage = "../../assets/night.png";
      } else if (this.weather.current.condition.text === "Partly cloudy" && this.weather.current.is_day == 1) {
        this.cureentWeatherImage = "../../assets/partlyCloud.png";
      } else if (this.weather.current.condition.text === "Cloudy" || this.weather.current.condition.text === "Overcast") {
        this.cureentWeatherImage = "../../assets/cloud.png";
      } else if (this.weather.current.condition.text === "Mist") {
        this.cureentWeatherImage = "../../assets/mist.png";
      } else if (this.weather.current.condition.text === "Patchy rain possible" || this.weather.current.condition.text === "Light rain" || this.weather.current.condition.text === "Moderate rain" || this.weather.current.condition.text === "Heavy rain at times" || this.weather.current.condition.text === "Light freezing rain" || this.weather.current.condition.text === "Torrential rain shower") {
        this.cureentWeatherImage = "../../assets/rain.png";
      } else if (this.weather.current.condition.text === "Heavy snow" || this.weather.current.condition.text === "Ice pellets" || this.weather.current.condition.text === "Light sleet showers") {
        this.cureentWeatherImage = "../../assets/mist.png";
      } else if (this.weather.current.condition.text === "Clear") {
        this.cureentWeatherImage = "../../assets/moon.png";
      } else {
        this.cureentWeatherImage = this.weather.current.condition.icon;
      }
    }
  }
}