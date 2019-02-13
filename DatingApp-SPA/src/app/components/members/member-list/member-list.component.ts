import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  public users: User[] = [];

  constructor(private _userService: UserService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(){
    debugger;
    this._userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    }, this._notificationService.error);
  }

}
