import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(public _authService: AuthService, private _notificator: NotificationService, private _router: Router) {}

  ngOnInit() {}

  login() {
    this._authService.login(this.model).subscribe(
      next => {
        this._notificator.success("Logged in successfully");
      },
      this._notificator.error,
      () => {
        this._router.navigate(["/members"]);
      }
    );
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  logout() {
    this._router.navigate(["/home"]);
    return this._authService.logout();
  }
}
