/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
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
  imageFiles: File[];
  imageInput: any;
  imageUrls: any[] | undefined;
  videoFile: any;
  videoInput: any;
  videoUrl: any | undefined;
  form = this.fb.group({
    video: [null],
    images: [null],
    title: [null, Validators.required],
    detail: [null, Validators.required]
  });

  private _submitted = false;
  private _hasError = false;
  private _loading = false;

  //#endregion


  //#region Properties
  get submitted(): boolean { return this._submitted; }
  get hasError(): boolean { return this._hasError; }
  get loading(): boolean { return this._loading; }
  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }


  //#endregion


  //#region Constructor

  constructor(
    private modalController: ModalController,
    private newsService: NewsService,
    private fb: FormBuilder,
    private storage: LocalStorageService
  ) { }


  //#endregion


  //#region Functions

  ngOnInit() { }

  async addNews(): Promise<void> {

    const form = this.form.value;

    const formData = new FormData();

    formData.append('video', this.videoFile as File);
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < this.imageFiles.length; i++) {
      formData.append('images[]', this.imageFiles[i]);
    }
    formData.append('title', form.title as string);
    formData.append('detail', form.detail as string);

    this._submitted = true;
    if (!this.form.valid) return;

    this._loading = true;
    this._hasError = false;


    try {

      const news = await this.newsService.addNews(formData);

      this.closeModal(news);
    } catch (error) {

      this._hasError = true;

    }

    this._loading = false;

  }

  processImage(imageInput: any): void {

    this.base64textString = [];
    const files: File[] = imageInput.files;
    this.imageFiles = files;
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
  processVideo(videoInput: any): void {

    this.videoFile = videoInput.files[0];

    const urlReader = new FileReader();
    urlReader.readAsDataURL(this.videoFile);
    urlReader.onload = (event) => this.videoUrl = event?.target?.result;
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
