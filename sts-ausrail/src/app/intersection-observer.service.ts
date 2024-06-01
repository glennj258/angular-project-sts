import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IntersectionObserverService {

  constructor() { }

  createObserver(callback: IntersectionObserverCallback, options: IntersectionObserverInit): IntersectionObserver {
    return new IntersectionObserver(callback, options);
  }
}