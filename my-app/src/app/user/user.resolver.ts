import { UsersService } from "./users.service";
import { User } from "./user";
import { Injectable } from "@angular/core";
import { Router, Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { EMPTY, Observable } from "rxjs";
import { catchError, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
// 1. generate then change boolean to User
export class UserResolver implements Resolve<User> {
  // 2. inject users and router
  constructor(private users: UsersService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    // 3. config below
    return this.users.getUser(route.params?.['id']).pipe(
      delay(4000),
      catchError(() => {
        this.router.navigate([""]);
        return EMPTY;
      })
    );
  }
}
