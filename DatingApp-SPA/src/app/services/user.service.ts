import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { PaginatedResult } from "../models/pagination.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  baseUrl: string = environment.BASE_API_URL;

  constructor(private _http: HttpClient) {}

  public getUsers(
    page?: any,
    itemsPerPage?: any,
    userParams?: any,
    likesParams?: any
  ): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page && itemsPerPage) {
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    if (userParams) {
      params = params.append("minAge", userParams.minAge);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }

    debugger;
    if (likesParams === "Likers") {
      params = params.append("likers", "true");
    }

    if (likesParams === "Likees") {
      params = params.append("likees", "true");
    }

    return this._http
      .get<User[]>(this.baseUrl + "/users", {
        observe: "response",
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get("Pagination")) {
            paginatedResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }
          return paginatedResult;
        })
      );
  }

  public getUser(id: number): Observable<User> {
    return this._http.get<User>(this.baseUrl + "/users/" + id);
  }

  public sendLike(id: number, recipientId: number) {
    return this._http.get(this.baseUrl + "/users/" + id + "/like/" + recipientId, {});
  }

  public updateUser(id: number, user: User) {
    return this._http.put(this.baseUrl + "/users/" + id, user);
  }

  public setMainPhoto(userId: number, photoId: number) {
    return this._http.post(this.baseUrl + "/users/" + userId + "/photos/" + photoId + "/setMain", {});
  }

  public deletePhoto(userId: number, photoId: number) {
    return this._http.delete(this.baseUrl + "/users/" + userId + "/photos/" + photoId);
  }
}
