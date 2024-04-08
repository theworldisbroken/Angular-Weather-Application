import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectMyStates } from './home/home.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(selectMyStates)
      .pipe(
        take(1),
        map(({ country }) => {
          if (country) {
            return true;
          }
          return this.router.parseUrl('');
        })
      );
  }
}
