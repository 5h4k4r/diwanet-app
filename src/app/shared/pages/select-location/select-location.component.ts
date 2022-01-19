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


  selectedCountry: Location | undefined;
  selectedCity: Location | undefined;
  private _countries: Location[] | undefined;
  private _cities: Location[] | undefined;
  private _loading = false;
  private _hasError = false;


  //#endregion



  //#region Properties
  get countries(): Location[] { return this._countries; }
  get cities(): Location[] { return this._cities; }
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
    this.listCountries();
  }

  selectLocation(): void {
    if (!this.selectedCity || !this.selectedCity) return;

    this.storage.setObject('location', this.selectedCity);
    this.messagingService.locationChanged();
    this.router.navigateByUrl('/tabs/suggests');

  }

  countryChanged(e: any): void {
    const value = e.target?.value;
    this.selectedCountry = value;
    this.listCities(value.id);

  }
  cityChanged(e: any): void {
    const value = e.target?.value;
    this.selectedCity = value;

  }
  //#endregion

  //#region Private Functions

  private async listCities(id: number): Promise<void> {
    this._loading = true;
    this._hasError = false;

    try {
      this._cities = await this.locationsService.listCities({ id });
    } catch (error) {
      this._hasError = true;

    }
    this._loading = false;
  }
  private async listCountries(): Promise<void> {
    this._loading = true;
    this._hasError = false;

    try {
      this._countries = await this.locationsService.listCountries();
    } catch (error) {
      this._hasError = true;

    }
    this._loading = false;
  }

  //#endregion


}
