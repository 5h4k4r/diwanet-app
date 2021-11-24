import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    document.documentElement.style.setProperty('--ion-font-family', 'Opensans regular');
  }
}
