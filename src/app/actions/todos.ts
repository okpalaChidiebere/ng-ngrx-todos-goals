import { createAction, props } from '@ngrx/store';

export type Todo = {
  id: number;
  name: string;
  complete: boolean;
};

export const addTodo = createAction('[Todo] Add', props<Todo>());

export const removeTodo = createAction(
  '[Todo] Remove',
  props<Pick<Todo, 'id'>>()
);

export const toggleTodo = createAction(
  '[Todo] Toggle a Todo',
  props<Pick<Todo, 'id'>>()
);