import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction } from '@ngrx/store';
import { catchError, forkJoin, from, map, of, switchMap } from 'rxjs';
import API from 'goals-todos-api';

import { Goal } from './goals';
import { Todo } from './todos';
import { AppState } from '../reducers';

export const receiveData = createAction(
  '[Shared] Receive Data',
  (todos: Todo[], goals: Goal[]) => ({
    todos,
    goals,
  })
);

export const initData = createAction('[Shared] Init');

/**
 * NOTE: we dont need to add it to he root of our app :)
 */
@Injectable()
export class SharedEffects {
  public readonly initData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initData), // we specify that we want this effect to run when the initData action is dispatched
      switchMap((payload) =>
        forkJoin({
          todos: API.fetchTodos(), //you can pass in promises
          goals: from(API.fetchGoals()), //you can convert the promise to observable using from() and pass to forkJoin
        })
      ),
      map(({ todos, goals }: AppState) => {
        return receiveData(todos, goals);
      }),
      catchError((error: string | null) => of())
    );
  });

  constructor(protected readonly actions$: Actions) {}
}
