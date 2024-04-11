import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { WeatherApiService } from '../weather/weather-api.service';
import { CitiesService } from '../cities/cities.service';
import { ForecastWeatherComponent } from '../forecast-weather/forecast-weather.component';
import { SnowflakesComponent } from '../snowflakes/snowflakes.component';
import { RainComponent } from '../rain/rain.component';
import { SunComponent } from '../sun/sun.component';
import { CloudsComponent } from '../clouds/clouds.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, ForecastWeatherComponent, SnowflakesComponent, RainComponent, SunComponent, CloudsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [WeatherApiService, CitiesService]
})

export class HomeComponent {

  constructor(private weatherApiService: WeatherApiService, private cities: CitiesService) { }
  weather: any;
  citiesList: string[] = this.cities.bigCities;
  cureentWeatherImage = "";
  city: string = 'Berlin';

  rainyWeather: boolean = false;
  snowyWeather: boolean = false;
  sunnyWeather: boolean = false;
  cloudyWeather: boolean = false;

  ngOnInit() {
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weather = weather;
      this.updateWeatherImage();
      this.handleWeather(this.weather.current.condition.text);
    });
  }

  handleCityInput(event: Event, city: string) {
    event.preventDefault();
    this.city = city;
    this.weatherApiService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weather = weather;
      this.updateWeatherImage();
      this.handleWeather(this.weather.current.condition.text);
    });
  }

  handleWeather(currentWeather: any) {
    if (currentWeather === "Patchy rain possible" || currentWeather === "Light rain" || currentWeather === "Moderate rain" || currentWeather === "Heavy rain at times" || currentWeather === "Light freezing rain" || currentWeather === "Torrential rain shower" || currentWeather === "Light drizzle" || currentWeather === "Patchy light drizzle") {
      this.rainyWeather = true;
      this.snowyWeather = false;
      this.sunnyWeather = false;
      this.cloudyWeather = false;
    } else if (currentWeather === "Heavy snow" || currentWeather === "Ice pellets" || currentWeather === "Light sleet showers") {
      this.snowyWeather = true;
      this.rainyWeather = false;
      this.sunnyWeather = false;
      this.cloudyWeather = false;
    } else if (currentWeather === "Sunny" || (currentWeather === "Partly cloudy" && this.weather.current.is_day == 1)) {
      this.sunnyWeather = true;
      this.snowyWeather = false;
      this.rainyWeather = false;
      if (currentWeather === "Partly cloudy") {
        this.cloudyWeather = true;
      } else {
        this.cloudyWeather = false;
      }
    } else if (currentWeather === "Partly cloudy") {
      this.cloudyWeather = true;
      this.snowyWeather = false;
      this.rainyWeather = false;
      if (this.weather.current.is_day == 1) {
        this.sunnyWeather = true;
      } else {
        this.sunnyWeather = false;
      }
    } else if (currentWeather === "Cloudy" || currentWeather === "Overcast") {
      this.cloudyWeather = true;
      this.sunnyWeather = false;
      this.snowyWeather = false;
      this.rainyWeather = false;
    } else {
      this.rainyWeather = false;
      this.snowyWeather = false;
      this.sunnyWeather = false;
      this.cloudyWeather = false;
    }
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
      } else if (this.weather.current.condition.text === "Patchy rain possible" || this.weather.current.condition.text === "Light rain" || this.weather.current.condition.text === "Moderate rain" || this.weather.current.condition.text === "Heavy rain at times" || this.weather.current.condition.text === "Light freezing rain" || this.weather.current.condition.text === "Torrential rain shower" || this.weather.current.condition.text === "Light drizzle") {
        this.cureentWeatherImage = "../../assets/rain.png";
      } else if (this.weather.current.condition.text === "Heavy snow" || this.weather.current.condition.text === "Ice pellets" || this.weather.current.condition.text === "Light sleet showers") {
        this.cureentWeatherImage = "../../assets/snowflakes.png";
      } else if (this.weather.current.condition.text === "Clear") {
        this.cureentWeatherImage = "../../assets/moon.png";
      } else {
        this.cureentWeatherImage = this.weather.current.condition.icon;
      }
    }
  }
}