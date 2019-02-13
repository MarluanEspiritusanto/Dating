import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  public user: User;

  constructor(private _userService: UserService, private _notificationService: NotificationService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    const userId = +this._route.snapshot.params['id'];
    this._userService.getUser(userId).subscribe((user: User) => {
      this.user = user;
    }, this._notificationService.error);
  }

}
