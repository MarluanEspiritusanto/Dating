import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from "./services/auth.service";
import { User } from "./models/user.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

  constructor(private _authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem("token");
    const user: User = JSON.parse(localStorage.getItem("user"));
    if (token) {
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    if (user) {
      this._authService.currentUser = user;
      this._authService.changeProfilePicture(user.photoUrl);
    }
  }
}
