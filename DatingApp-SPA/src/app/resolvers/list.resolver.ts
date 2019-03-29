import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { User } from "../models/user.model";
import { UserService } from "../services/user.service";
import { NotificationService } from "../services/notification.service";
import { Observable, of } from "rxjs/";
import { catchError } from "rxjs/operators";

@Injectable()
export class ListResolver implements Resolve<User[]> {
  public pageNumber: number = 1;
  public pageSize: number = 5;
  public likeParam: string = "Likers";

  constructor(
    private _userService: UserService,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this._userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam).pipe(
      catchError(error => {
        this._notificationService.error("Problem retrieving data");
        this._router.navigate(["/home"]);
        return of(null);
      })
    );
  }
}
