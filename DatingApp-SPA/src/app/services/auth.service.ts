import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseUrl: string = "http://localhost:5000/api";

  constructor(private _http: HttpClient) {}

  login(model: any) {
    return this._http.post(this.baseUrl + "/auth/login", model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem("token", user.token);
        }
      })
    );
  }

  register(model: any) {
    return this._http.post(this.baseUrl + "/auth/register", model);
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  logout() {
    localStorage.removeItem("token");
    return true;
  }
}
