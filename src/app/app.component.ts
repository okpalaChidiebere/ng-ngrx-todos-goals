import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-ngrx-todos-goals';

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.store.subscribe((store: AppState) => console.log(store)); //NOTE: No need to unsubscribe. Angular does that for us
  }
}
