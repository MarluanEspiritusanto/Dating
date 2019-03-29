import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { Pagination } from "src/app/models/pagination.model";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { PaginatedResult } from "../../models/pagination.model";

@Component({
  selector: "app-lists",
  templateUrl: "./lists.component.html",
  styleUrls: ["./lists.component.css"]
})
export class ListsComponent implements OnInit {
  public users: User[] = [];
  public pagination: Pagination;
  public likesParam: string = "";

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    public _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });

    this.likesParam = "Likers";
  }

  public loadUsers() {
    this._userService
      .getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((response: PaginatedResult<User[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, this._notificationService.error);
  }

  public pageChanges(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
