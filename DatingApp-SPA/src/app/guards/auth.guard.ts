import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { NotificationService } from "../services/notification.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router, private _notificator: NotificationService) {}
  canActivate(): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    }

    this._notificator.error("You're not authenticated");
    this._router.navigate(["/home"]);
    return false;
  }
}
