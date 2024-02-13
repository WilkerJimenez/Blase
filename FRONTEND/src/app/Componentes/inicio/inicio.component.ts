import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

  constructor() {
  }
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
  @HostListener('window:scroll', ['$event'])
  scrollHandler(event: any) {
    let section = document.querySelectorAll('section');
    const trigger = window.innerHeight  / 2 * 1;

    section.forEach(sec => {
      const secTop = sec.getBoundingClientRect().top;
      if (secTop < trigger) {
        sec.classList.add('animate-fadeIn');
      } else {
        sec.classList.remove('animate-fadeIn');
      }
    })
  }

  onClick() {
    this.router.navigate(['/auth'])
  }
}
