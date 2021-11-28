import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
})
export class ImagePreviewComponent implements OnInit {
  @Input() image: string;

  @ViewChild('slider') slider: ElementRef;

  get sliderOptions(): any {
    return {
      zoom: {
        maxRatio: 5
      }
    };
  }

  constructor(
    private modalController: ModalController,
  ) { }


  ngOnInit() { }


  closeModal(msg?: string): void {
    this.modalController.dismiss(msg);
  }
}
