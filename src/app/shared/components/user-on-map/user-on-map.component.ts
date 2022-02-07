import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';

@Component({
  selector: 'app-user-on-map',
  templateUrl: './user-on-map.component.html',
  styleUrls: ['./user-on-map.component.scss'],
})
export class UserOnMapComponent implements OnInit {
  //#region Fields

  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @Input() users: ServiceMan[];
  @Input() zoom = 12;




  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  markerOptions: google.maps.MarkerOptions = { draggable: false, };
  markerPositions: google.maps.LatLngLiteral[] = [];
  selectedMarkerInfoWindowContent: string | undefined;
  mapStyles?: Array<any>;

  private _hasError = false;

  //#endregion

  //#region Properties

  get addresses(): { lat: number; long: number }[] {
    return this.users?.map(user => { if (user.lat && user.long) return { lat: user.lat, long: user.long }; else return; });
  }
  get hasError(): boolean { return this._hasError; }

  //#endregion

  //#region Constructor


  constructor() { }


  //#endregion

  //#region Functions

  ngOnInit(): void {
    this.initMap();

  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, index: number) {
    const user = this.users[index];
    if (!user.lat || !user.long) return;

    infoWindow.open(marker);
  }

  //#endregion

  //#region Private Functions

  private initMap() {
    if (!this.addresses) return;
    for (const deliveryAddress of this.addresses) {
      const latLng: { lat: number; lng: number } = { lat: deliveryAddress.lat, lng: deliveryAddress.long };

      if (!deliveryAddress) return;

      this.markerPositions.push(latLng);
      this.center = latLng;
    }




  }
  //#endregion
}
