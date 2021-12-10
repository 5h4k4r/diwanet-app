import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  locationChange = new EventEmitter<null>();
  constructor() { }

  locationChanged(): void {
    this.locationChange.emit(null);
  }

}
