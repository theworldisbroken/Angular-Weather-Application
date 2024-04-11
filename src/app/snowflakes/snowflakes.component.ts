import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-snowflakes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snowflakes.component.html',
  styleUrl: './snowflakes.component.css'
})

export class SnowflakesComponent {
  snowArray: number[] = Array.from({ length: 30 }, (v, i) => i);
}
