import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: string = "http://localhost:5000/api";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private _http: HttpClient) {}

  login(model: any) {
    return this._http.post(this.baseUrl + "/auth/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this._http.post(this.baseUrl + "/auth/register", model);
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    debugger;
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem("token");
    return true;
  }
}
