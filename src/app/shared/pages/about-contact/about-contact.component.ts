import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.scss'],
})
export class AboutContactComponent implements OnInit {
  @Input() html: string;
  @Input() title: string;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }


  closeModal(): void {
    this.modalController.dismiss();
  }
}
