import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public baseUrl: string = environment.BASE_API_URL;
  public jwtHelper = new JwtHelperService();
  public decodedToken: any;
  public currentUser: User;
  public photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  public currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private _http: HttpClient) {}

  login(model: any) {
    debugger;
    return this._http.post(this.baseUrl + "/auth/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("user", JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.changeProfilePicture(this.currentUser.photoUrl);
        }
      })
    );
  }

  register(user: User) {
    return this._http.post(this.baseUrl + "/auth/register", user);
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.decodedToken = null;
    this.currentUser = null;
    return true;
  }

  changeProfilePicture(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }
}
