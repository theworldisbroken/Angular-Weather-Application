import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast-weather.component.html',
  styleUrl: './forecast-weather.component.css'
})

export class ForecastWeatherComponent {
  @Input() forecastList: any;

  getDayName(dateStr: Date, locale: any){
      let date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });        
  }

}
