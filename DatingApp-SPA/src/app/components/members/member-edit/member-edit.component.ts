import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { User } from "src/app/models/user.model";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "src/app/services/notification.service";
import { NgForm } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-member-edit",
  templateUrl: "./member-edit.component.html",
  styleUrls: ["./member-edit.component.css"]
})
export class MemberEditComponent implements OnInit {
  public user: User;
  public photoUrl: string;
  @ViewChild("editForm") editForm: NgForm;
  @HostListener("window:beforeunload", ["$event"])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _notificationService: NotificationService,
    private _userService: UserService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    this._route.data.subscribe(data => {
      this.user = data["user"];
    });
    this._authService.currentPhotoUrl.subscribe(photoUrl => (this.photoUrl = photoUrl));
  }

  updateUser() {
    this._userService.updateUser(this._authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this._notificationService.success("Profile updated successfully");
        this.editForm.reset(this.user);
      },
      error => {
        this._notificationService.error(error);
      }
    );
  }

  public updateProfilePicture(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
}
