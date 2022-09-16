import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { GOALS_FEATURE_KEY, goalsReducer, GoalsState } from './goals';
import { TODOS_FEATURE_KEY, todosReducer, TodosState } from './todos';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({}),
    StoreModule.forFeature(GOALS_FEATURE_KEY, goalsReducer),
    StoreModule.forFeature(TODOS_FEATURE_KEY, todosReducer),
  ],
})
export class AppStore {}
export interface AppState {
  todos: TodosState;
  goals: GoalsState;
}
