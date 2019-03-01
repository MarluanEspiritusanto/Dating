import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = environment.BASE_API_URL;

  constructor(private _http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.baseUrl + '/users');
  }

  public getUser(id: number): Observable<User> {
    return this._http.get<User>(this.baseUrl + '/users/' + id);
  }

  public updateUser(id: number, user: User) {
    return this._http.put(this.baseUrl + '/users/' + id, user);
  }
}
