import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: any) {
    const btn = document.querySelector<HTMLElement>('.mouse-cursor-gradient-tracking');
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    btn?.style.setProperty('--x', x + 'px');
    btn?.style.setProperty('--y', y + 'px');
  }
}
