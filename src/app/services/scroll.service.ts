import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('#')) {
        const fragment = event.url.split('#')[1];
        setTimeout(() => {
          this.scrollToElement(fragment);
        }, 100);
      }
    });
  }

  scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      // Abrir el panel si es un p-panel
      const panel = element as any;
      if (panel && panel.toggleable !== undefined) {
        panel.expanded = true;
      }
    }
  }
} 