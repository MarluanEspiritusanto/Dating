import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Photo } from "src/app/models/photo.model";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { AuthService } from "src/app/services/auth.service";
import { UserService } from "src/app/services/user.service";
import { NotificationService } from "src/app/services/notification.service";

@Component({
  selector: "app-photo-editor",
  templateUrl: "./photo-editor.component.html",
  styleUrls: ["./photo-editor.component.css"]
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  public uploader: FileUploader;
  public hasBaseDropZoneOver: boolean = false;
  public baseUrl = environment.BASE_API_URL;
  public currentMainPhoto: Photo;

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private _notificationService: NotificationService
  ) {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit() {
    this.initializeUploader();
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "/users/" + this._authService.decodedToken.nameid + "/photos",
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 8 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const res: Photo = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.url,
        isMain: res.isMain,
        description: res.description,
        dateAdded: res.dateAdded
      };

      this.photos.push(photo);
    };
  }

  setMainPhoto(photo: Photo) {
    this._userService.setMainPhoto(this._authService.decodedToken.nameid, photo.id).subscribe(
      () => {
        this.currentMainPhoto = this.photos.find(p => p.isMain);
        this.currentMainPhoto.isMain = false;
        photo.isMain = true;
        this._authService.changeProfilePicture(photo.url);
        this._authService.currentUser.photoUrl = photo.url;
        localStorage.setItem("user", JSON.stringify(this._authService.currentUser));
      },
      err => this._notificationService.error(err)
    );
  }

  deletePhoto(photoId: number) {
    this._notificationService.confirm("Are your sure you want to delete this photo", () => {
      this._userService.deletePhoto(this._authService.decodedToken.nameid, photoId).subscribe(
        () => {
          this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
          this._notificationService.success("Photo has been deleted successfully");
        },
        err => this._notificationService.error("Failed to delete the photo")
      );
    });
  }
}
