import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { NotificationService } from "src/app/services/notification.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"]
})
export class MemberListComponent implements OnInit {
  public users: User[] = [];

  constructor(private _notificationService: NotificationService, private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.users = data["users"];
    });
  }
}
