import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from '../backend/services/local-storage.service';

@Injectable({ providedIn: 'root' })
export class LocationGuard implements CanActivate {
  constructor(
    private storage: LocalStorageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const location = this.storage.getObject('location');
    if (location)
      return true;

    else {
      this.router.navigateByUrl('/location');
      return false;
    }
  }
}
