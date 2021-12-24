import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Location } from 'src/app/backend/models/location.model';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { LocationsService } from 'src/app/backend/services/locations.service';
import { MessagingService } from '../../services/messaging.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.scss'],
})
export class SelectLocationComponent implements OnInit {

  //#region Fields


  private _selectedLocation: Location | undefined;
  private _locations: Location[] | undefined;
  private _loading = false;
  private _hasError = false;


  //#endregion



  //#region Properties
  get selectedLocation(): Location | undefined { return this._selectedLocation; }
  get locations(): Location[] { return this._locations; }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }
  //#endregion


  //#region Constructor



  constructor(
    private locationsService: LocationsService,
    private storage: LocalStorageService,
    private router: Router,
    private messagingService: MessagingService,
  ) { }



  //#endregion


  //#region Functions


  ngOnInit() {
    this.getLocations();
  }

  selectLocation(): void {
    if (!this._selectedLocation) return;

    this.storage.setObject('location', this._selectedLocation);
    this.messagingService.locationChanged();
    this.router.navigateByUrl('/tabs/suggests');

  }

  selectionChanged(e: any): void {
    const value = e.target?.value;
    this._selectedLocation = value;

  }
  //#endregion

  //#region Private Functions

  private async getLocations(): Promise<void> {
    this._loading = true;
    this._hasError = false;

    try {
      this._locations = await this.locationsService.getLocations();
    } catch (error) {
      this._hasError = true;

    }
    this._loading = false;
  }

  //#endregion


}
