import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { NewsService } from 'src/app/backend/services/news.service';
import { ImagePreviewComponent } from 'src/app/shared/components/image-preview/image-preview.component';
@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss'],
})
export class NewsAddComponent implements OnInit {
  //#region Fields
  base64textString: string[] = [];
  imageInput: any;
  imageUrls: any[] | undefined = [];
  form = this.fb.group({
    images: [null],
    title: ['', Validators.required],
    detail: ['', Validators.required]
  });

  private _submitted = false;
  private _hasError = false;
  private _loading = false;

  //#endregion


  //#region Properties
  get submitted(): boolean { return this._submitted; }
  get hasError(): boolean { return this._hasError; }
  get loading(): boolean { return this._loading; }

  //#endregion


  //#region Constructor

  constructor(
    private modalController: ModalController,
    private newsService: NewsService,
    private fb: FormBuilder,
  ) { }


  //#endregion


  //#region Functions

  ngOnInit() { }

  async addNews(): Promise<void> {
    this._submitted = true;
    if (!this.form.valid) return;

    this._loading = true;
    this._hasError = false;

    const form = this.form.value;

    try {

      await this.newsService.addNews({ title: form.title, detail: form.detail, images: this.base64textString });
      this.closeModal();
    } catch (error) {

      this._hasError = true;

    }

    this._loading = false;

  }

  processFile(imageInput: any): void {

    this.base64textString = [];
    const files: File[] = imageInput.files;
    this.imageUrls = [];
    for (const file of files) {

      const reader = new FileReader();

      reader.onload = (event) => this.handleReaderLoaded(event);
      reader.readAsBinaryString(file);

      const urlReader = new FileReader();
      urlReader.readAsDataURL(file);
      urlReader.onload = (event) => this.imageUrls.push(event?.target?.result);

      // this.imageInput = null;
    }
    // Create form data

    // Store form name as "file" with file data
  }
  async openImage(image): Promise<void> {
    const modal = await this.modalController.create({
      component: ImagePreviewComponent,
      componentProps: { image }
    });

    await modal.present();
  }

  async closeModal(msg?: any): Promise<void> {
    await this.modalController.dismiss(msg);
  }
  //#endregion



  //#region Private Functions
  private handleReaderLoaded(readerEvt): void {

    const base64String = 'data:image/png;base64,' + btoa(readerEvt.target.result);
    this.base64textString.push(base64String);
  }


  //#endregion
}
