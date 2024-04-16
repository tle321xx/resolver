import { merge, Observable } from "rxjs";
import { ResolveEnd, ResolveStart, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { filter, mapTo } from "rxjs/operators";

@Component({
  selector: "app-root",
  template: `
  <!-- 6. add mat-progress 9.add ngIf -->
    <mat-progress-bar
      *ngIf="isLoading$ | async"
      mode="buffer"
      style="position: absolute;"
    ></mat-progress-bar>
    <mat-toolbar color="primary">
      <span>Resolve Guard:</span>
      <a mat-button routerLink="/">Users</a>
    </mat-toolbar>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .content {
        padding: 20px;
        box-sizing: border-box;
      }
    `,
  ],
})

// additional after 6 use router event
// 7. implement below
export class AppComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  // showLoaderEvents is stream which will be emits value when we have to show
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      mapTo(true)
    );
    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      mapTo(false)
    );
    // 8. merge 2 steams merge(true, false)
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);
  }
}
