import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MemberListComponent } from "./components/members/member-list/member-list.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { ListsComponent } from "./pages/lists/lists.component";
import { AuthGuard } from "./guards/auth.guard";
import { MemberDetailComponent } from "./components/members/member-detail/member-detail.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "members/:id", component: MemberDetailComponent },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
