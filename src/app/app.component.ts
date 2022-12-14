import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './reducers';
import * as sharedActions from './actions/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-ngrx-todos-goals';

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(sharedActions.initData()); //load initial data for our app
    // this.store.subscribe((store: AppState) => console.log(store)); //NOTE: No need to unsubscribe. Angular does that for us
  }
}
