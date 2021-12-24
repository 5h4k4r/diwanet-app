import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ServiceMan } from 'src/app/backend/models/serviceman.model';
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
  //#endregion


  //#region Constructor


  constructor(
    private usersService: UsersService,
    private platform: Platform
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

      this._users = await this.usersService.listServiceMen();
      this._users = this.users.filter(i => i.lat && i.long);

    } catch (error) {
      this._hasError = true;

    }

    this._loading = false;
  }


  //#endregion

}
