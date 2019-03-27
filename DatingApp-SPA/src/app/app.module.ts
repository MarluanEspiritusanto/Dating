// Modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from "ngx-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";
import { FileUploadModule } from "ng2-file-upload";

// Components
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./pages/home/home.component";
import { MemberListComponent } from "./components/members/member-list/member-list.component";
import { ListsComponent } from "./pages/lists/lists.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { RegisterComponent } from "./pages/register/register.component";
import { MemberCardComponent } from "./components/members/member-card/member-card.component";
import { MemberDetailComponent } from "./components/members/member-detail/member-detail.component";
import { MemberEditComponent } from "./components/members/member-edit/member-edit.component";
import { PhotoEditorComponent } from "./components/members/photo-editor/photo-editor.component";

// Services
import { AuthService } from "./services/auth.service";
import { NotificationService } from "./services/notification.service";
import { UserService } from "./services/user.service";

// Guards
import { AuthGuard } from "./guards/auth.guard";
import { PreventUnsaveGuard } from "./guards/prevent-unsave.guard";

// Interceptors
import { ErrorInterceptorProvider } from "./interceptors/error.interceptor";

// Routes
import { appRoutes } from "./routes";

// Resolvers
import { MemberDetailResolver } from "./resolvers/member-detail.resolver";
import { MemberListResolver } from "./resolvers/member-list.resolver";
import { MemberEditResolver } from "./resolvers/member-edit.resolver";

// Pipes
import { TimeAgoPipe } from "time-ago-pipe";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    NotificationService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsaveGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
