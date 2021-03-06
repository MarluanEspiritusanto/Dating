import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MemberListComponent } from "./components/members/member-list/member-list.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { ListsComponent } from "./pages/lists/lists.component";
import { AuthGuard } from "./guards/auth.guard";
import { MemberDetailComponent } from "./components/members/member-detail/member-detail.component";
import { MemberDetailResolver } from "./resolvers/member-detail.resolver";
import { MemberListResolver } from "./resolvers/member-list.resolver";
import { MemberEditComponent } from "./components/members/member-edit/member-edit.component";
import { MemberEditResolver } from "./resolvers/member-edit.resolver";
import { PreventUnsaveGuard } from "./guards/prevent-unsave.guard";
import { ListResolver } from "./resolvers/list.resolver";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: "members/:id", component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
      {
        path: "member/edit",
        component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsaveGuard]
      },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent, resolve: { users: ListResolver } }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
