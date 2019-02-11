import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  model: any = {};

  constructor(private _authService: AuthService) {}

  ngOnInit() {}

  login() {
    this._authService.login(this.model).subscribe(
      next => {
        console.log(true);
      },
      error => console.log
    );
  }

  isLoggedIn() {
    return this._authService.isLoggedIn();
  }

  logout() {
    return this._authService.logout();
  }
}
