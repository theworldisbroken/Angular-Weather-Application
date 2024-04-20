import { Component, Input, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
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
  hourlyWeather: any;
  @ViewChild('hoursContainer') hoursContainer!: ElementRef;

  selectedIndex: number | null = 0;
  showHourContainerButtons: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['forecastList']) {
      this.hourlyWeather = this.forecastList[0].hour;
    }
  }

  getDayName(dateStr: Date, locale: any) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
  }

  getHour(dateStr: Date) {
    let date = new Date(dateStr);
    let hour = date.getHours();
    if (hour < 10) {
      return "0" + hour;
    } else {
      return hour;
    }
  }

  setSelectedIndex(index: number) {
    if (this.selectedIndex !== null) {
      this.selectedIndex = null;
    }
    this.selectedIndex = index;
  }

  setDayHours(event: Event, hours: any) {
    event.preventDefault();
    this.hourlyWeather = hours;
  }

  findStartingHour(date: Date) {
    const hourDateObj = new Date(date);
    const currentDate = new Date();
    const buttons = document.querySelectorAll('.scroll-btn') as NodeListOf<HTMLElement>;
    if ((hourDateObj.getHours() >= currentDate.getHours()) && hourDateObj.getDate() == currentDate.getDate()) {
      if (currentDate.getHours() >= 17) {
        buttons.forEach(button => button.style.display = 'none');
      } else {
        buttons.forEach(button => button.style.display = 'block');
      }
      return true;
    } else {
      if (hourDateObj.getDate() != currentDate.getDate()) {
        buttons.forEach(button => button.style.display = 'block');
        return true;
      }
      return false;
    }
  }

  scroll(direction: 'left' | 'right') {
    const containerElement = this.hoursContainer.nativeElement;
    const scrollAmount = 500;

    if (direction === 'left') {
      containerElement.scrollLeft -= scrollAmount;
    } else {
      containerElement.scrollLeft += scrollAmount;
    }
  }
}
