import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { MemberListComponent } from "./pages/member-list/member-list.component";
import { MessagesComponent } from "./pages/messages/messages.component";
import { ListsComponent } from "./pages/lists/lists.component";
import { AuthGuard } from "./guards/auth.guard";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent },
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
