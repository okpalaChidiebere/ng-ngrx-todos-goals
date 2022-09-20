import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { createAction, createActionGroup, props, Store } from '@ngrx/store';
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

export type Todo = {
  id: string;
  name: string;
  complete: boolean;
};

export const addTodo = createAction('[Todo] Add', (todo: Todo) => ({
  todo,
}));

export const removeTodo = createAction(
  '[Todo] Remove',
  props<Pick<Todo, 'id'>>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle a Todo',
  props<Pick<Todo, 'id'>>()
);

export const TodoHandlers = createActionGroup({
  source: 'TodoEffects',
  events: {
    'Add Todo': (name: string, cb: () => void) => ({ name, cb }),
    'Remove Todo': (todo: Todo) => ({ todo }),
    'Toggle Todo': (id: string) => ({ id }),
  },
});

@Injectable()
export class TodosEffects {
  handleAddTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoHandlers.addTodo),
      switchMap((action) => {
        return forkJoin([of(action.cb), from(API.saveTodo(action.name))]);
      }),
      map(([cb, todo]: [() => void, Todo]) => {
        cb();
        return addTodo(todo);
      }),
      catchError((error: string | null) => of())
    )
  );

  public readonly handleDeleteTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoHandlers.removeTodo),
        map((action) => action.todo),
        tap((todo) => this.store.dispatch(removeTodo({ id: todo.id }))),
        exhaustMap((goal) =>
          from(API.deleteTodo(goal.id)).pipe(
            map(() => of()),
            catchError((error) => {
              this.store.dispatch(removeTodo(goal));
              alert('An error occurred. Try again.');
              return of();
            })
          )
        )
      ),
    { dispatch: false }
  );

  public readonly handleToggleTodo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TodoHandlers.toggleTodo),
        map((action) => action.id),
        tap((id) => this.store.dispatch(toggleTodo({ id }))),
        exhaustMap((id) =>
          from(API.saveTodoToggle(id)).pipe(
            map(() => of()),
            catchError((error) => {
              this.store.dispatch(toggleTodo({ id }));
              alert('An error occurred. Try again.');
              return of();
            })
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private readonly store: Store<AppState>
  ) {}
}
