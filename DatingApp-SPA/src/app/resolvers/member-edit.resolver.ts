import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Observable, of } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(private _userService: UserService, private _notificationService: NotificationService, private _router: Router, private _authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this._userService.getUser(this._authService.decodedToken.nameid).pipe(
      catchError(error => {
        this._notificationService.error('Problem retrieving your data');
        this._router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
