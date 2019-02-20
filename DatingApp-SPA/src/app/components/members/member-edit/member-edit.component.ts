import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  public user: User;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.user = data['user'];
    });
  }
}
