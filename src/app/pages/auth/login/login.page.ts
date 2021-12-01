import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/backend/services/alert.service';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/backend/services/auth.service';
import { TokenStoreService } from 'src/app/backend/services/token-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //#region Fields

  ngForm: FormGroup;
  // tslint:disable: variable-name
  passwordType = 'password';
  passwordIcon = 'eye-off-outline';

  hide = true;
  private _loading = false;
  private _errorMassage = '';
  private _submitted = false;
  private _returnUrl: string;
  //#endregion

  //#region Properties
  get loading() { return this._loading; }
  get error() { return this._errorMassage; }
  get submitted() { return this._submitted; }
  //#endregion

  //#region Constructor
  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private tokenStore: TokenStoreService,
  ) {

  }
  //#endregion

  //#region Funtions
  async ngOnInit(): Promise<void> {
    this.ngForm = new FormGroup({
      handle: new FormControl('07702254426', Validators.required),
      password: new FormControl('123456', Validators.required)
    });
    // get return url from route parameters or default to '/dashboard-tabs'
    this._returnUrl = this.route.snapshot.queryParams.returnUrl || '/tabs/vip';
    await this.tokenStore.isReady$;

    if (this.tokenStore.accessToken) {

      await this.resolveRoute();
    }
  }

  async loginAsync() {
    if (this.ngForm.invalid || this.loading) {
      return;
    }
    this._submitted = true;

    this._loading = true;
    this._errorMassage = '';

    const loginModel = this.ngForm.value;

    try {
      await this.authService.login({
        handle: loginModel.handle,
        password: loginModel.password
      });
      await this.resolveRoute();
    } catch (error) {
      this._errorMassage = 'Invalid Handle or Password';
    }


    this._submitted = false;
    this._loading = false;
    this.ngForm.reset();
  }

  hideShowPassword() {

    if (this.passwordType === 'text') {
      this.passwordType = 'password';
    } else {
      this.passwordType = 'text';
    }
    if (this.passwordIcon === 'eye-off') {
      this.passwordIcon = 'eye-outline';
    } else {
      this.passwordIcon = 'eye-off-outline';
    }
  }
  //#endregion

  //#region Private Functions
  private resolveRoute() {
    this.router.navigate([this._returnUrl]);
  }
}
