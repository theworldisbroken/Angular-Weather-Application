import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rain',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rain.component.html',
  styleUrl: './rain.component.css'
})

export class RainComponent {
  rainArray: number[] = Array.from({ length: 50 }, (v, i) => i);
  @Input() rainyWeather!: boolean;
}