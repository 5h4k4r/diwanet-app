import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { UsersService } from 'src/app/backend/services/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit, OnDestroy {
  //#region Fields
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @Input() set userList(userList: ServiceMan[] | undefined) {
    if (!userList?.length) {

      this.clearMap();
      return;
    }

    this._userList = userList;
    this.initMap();
  };






  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = { draggable: false, };
  markerPositions: google.maps.LatLngLiteral[] = [];
  selectedMarkerInfoWindowContent: string | undefined;
  mapStyles?: Array<any>;

  private _userList!: any[];
  private destroy$ = new Subject();
  private _loading = false;
  private _hasError = false;
  private _users: ServiceMan[];
  //#endregion


  //#region Properties
  get addresses(): { lat: number; long: number }[] {
    return this.users?.map(user => { if (user.lat && user.long) return { lat: user.lat, long: user.long }; else return; });
  }
  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }
  get users(): ServiceMan[] { return this._users; }
  //#endregion


  //#region Constructor


  constructor(
    private usersService: UsersService,
  ) { }

  //#endregion

  //#region Functions

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getAllUsers();
    this.initMap();
  }

  async getAllUsers(): Promise<void> {

    try {

      this._loading = true;

      this._users = await this.usersService.listServiceMen();
      this._users = this.users.filter(i => i.lat && i.long);

    } catch (error) {
      this._hasError = true;

    }

    this._loading = false;
  }

  openInfoWindow(marker: MapMarker, infoWindow: MapInfoWindow, index: number) {
    const user = this.users[index];
    if (!user.lat || !user.long) return;

    infoWindow.open(marker);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
  private clearMap(): void {


    this.markerPositions = [];
  }
  //#endregion
}
