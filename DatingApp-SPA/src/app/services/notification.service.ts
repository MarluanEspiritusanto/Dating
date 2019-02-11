import { Injectable } from "@angular/core";

declare let alertify: any;

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor() {}

  confirm(message: string, okCallback: Function) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {
      }
    });
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  info(message: string) {
    alertify.info(message);
  }
}
