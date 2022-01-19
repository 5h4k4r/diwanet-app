/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
import { LocalStorageService } from 'src/app/backend/services/local-storage.service';
import { UsersService } from 'src/app/backend/services/users.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  //#region Fields

  private _loading = false;
  private _hasError = false;
  private _users: ServiceMan[];
  //#endregion


  //#region Properties
  get isAndroid(): boolean { return this.platform.is('android'); }

  get loading(): boolean { return this._loading; }
  get hasError(): boolean { return this._hasError; }
  get users(): ServiceMan[] { return this._users; }

  get location_id(): number { return this.storage.getObject('location')?.id ?? undefined; }

  //#endregion


  //#region Constructor


  constructor(
    private usersService: UsersService,
    private platform: Platform,
    private storage: LocalStorageService,
  ) { }

  //#endregion

  //#region Functions

  async ngOnInit(): Promise<void> {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    await this.getAllUsers();
  }

  async getAllUsers(): Promise<void> {

    try {

      this._loading = true;

      this._users = await this.usersService.listServiceMen({
        location_id: this.location_id
      });
      this._users = this.users.filter(i => i.lat && i.long);

    } catch (error) {
      this._hasError = true;

    }

    this._loading = false;
  }


  //#endregion

}
