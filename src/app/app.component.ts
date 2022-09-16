import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './reducers';
import { GoalsState, selectGoals } from './reducers/goals';
import { selectTodos, TodosState } from './reducers/todos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ng-ngrx-todos-goals';
  todos: Observable<TodosState>;
  goals: Observable<GoalsState>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit() {
    this.todos = this.store.pipe(select(selectTodos));
    this.goals = this.store.pipe(select(selectGoals));

    this.store.subscribe((store: AppState) => console.log(store)); //NOTE: No need to unsubscribe. Angular does that for us
    // this.todos.subscribe((todos) => console.log(todos));
  }
}
