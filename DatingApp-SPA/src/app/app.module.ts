import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BsDropdownModule } from "ngx-bootstrap";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from "@angular/forms";
import { AuthService } from "./services/auth.service";
import { HomeComponent } from "./pages/home/home.component";
import { RegisterComponent } from "./pages/register/register.component";
import { ErrorInterceptorProvider } from "./interceptors/error.interceptor";
import { NotificationService } from "./services/notification.service";
import { MemberListComponent } from "./pages/member-list/member-list.component";
import { ListsComponent } from "./pages/lists/lists.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule, BsDropdownModule.forRoot(), RouterModule.forRoot(appRoutes)],
  providers: [AuthService, ErrorInterceptorProvider, NotificationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
