import { UserComponent } from "./user/user.component";
import { UserListComponent } from "./user/user-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserResolver } from "./user/user.resolver";

const routes: Routes = [
  { path: "", component: UserListComponent },
  {
    path: "user/:id",
    component: UserComponent,
    // 4. config resolver
    resolve: {
      // user is key ตั้งชื่อไรก็ได้ using to fetch resolved data from our router
      user: UserResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
