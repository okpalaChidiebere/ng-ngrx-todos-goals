import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, props, Store } from '@ngrx/store';
import {
  catchError,
  exhaustMap,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import API from 'goals-todos-api';
import { AppState } from '../reducers';

export type Goal = {
  id: string;
  name: string;
};

export const addGoal = createAction('[Goal] Add', (goal: Goal) => ({
  goal,
}));

export const removeGoal = createAction(
  '[Goal] Remove',
  props<Pick<Goal, 'id'>>()
);

export const handleAddGoal = createAction(
  '[GoalEffect] Handle Add Goal',
  (name: string, cb: () => void) => ({ name, cb })
);

export const handleDeleteGoal = createAction(
  '[GoalEffect] Handle Remove Goal',
  (goal: Goal) => ({ goal })
);

@Injectable()
export class GoalsEffects {
  public readonly handleAddGoal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(handleAddGoal),
      switchMap((action) => {
        return forkJoin([of(action.cb), from(API.saveGoal(action.name))]);
      }),
      tap((result) => console.log({ goal: result[1] })),
      map(([cb, goal]: [() => void, Goal]) => {
        cb();
        return addGoal(goal);
      }),
      catchError((error: string | null) => of())
    );
  });

  /**
   * This handler performs an optimistic update where we first remove the
   * goal because we don't want the user to wait for the network call that
   * deletes the goal from the DB.
   * If the network call fails, we let the user know and rollback
   */
  public readonly handleDeleteGoal$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(handleDeleteGoal),
        map((action) => action.goal), //we pass down only goal property from the action
        tap((goal) => this.store.dispatch(removeGoal({ id: goal.id }))),
        exhaustMap((goal) =>
          from(API.deleteGoal(goal.id)).pipe(
            map((user) => of()),
            catchError((error) => {
              this.store.dispatch(addGoal(goal));
              alert('An error occurred. Try again.');
              return of();
            })
          )
        )
      ),
    {
      dispatch: false, //we set this to false because we don't want this effect to return an action which will be dispatched
    }
  );

  constructor(
    protected readonly actions$: Actions,
    private readonly store: Store<AppState>
  ) {}
}
