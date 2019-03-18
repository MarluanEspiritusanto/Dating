import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { User } from "src/app/models/user.model";
import { NotificationService } from "src/app/services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  public user: User;
  public registerForm: FormGroup;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _notificationService: NotificationService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: "theme-dark-blue"
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this._formBuilder.group(
      {
        gender: ["male"],
        username: ["", Validators.required],
        knownAs: ["", Validators.required],
        birthday: [null, Validators.required],
        city: ["", Validators.required],
        country: ["", Validators.required],
        password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
        confirmPassword: ["", Validators.required]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value ? null : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this._authService.register(this.user).subscribe(
        () => {
          this._notificationService.success("Registration successful");
        },
        err => this._notificationService.error(err),
        () => {
          this._authService.login(this.user).subscribe(() => this._router.navigate(["/members"]));
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
