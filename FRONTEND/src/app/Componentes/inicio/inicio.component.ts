import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  router = new Router;
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    const btn = document.querySelector<HTMLElement>('.mouse-cursor-gradient-tracking');
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    btn?.style.setProperty('--x', x + 'px');
    btn?.style.setProperty('--y', y + 'px');
  }

  onClick() {
    this.router.navigate(['/auth'])
  }
}
