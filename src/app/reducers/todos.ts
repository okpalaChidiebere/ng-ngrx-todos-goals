import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { receiveData } from '../actions/shared';
import { addTodo, removeTodo, toggleTodo, Todo } from '../actions/todos';

export const TODOS_FEATURE_KEY = 'todos';
export const initialState: Todo[] = [];
export const getTodosState = createFeatureSelector(TODOS_FEATURE_KEY);
export type TodosState = Todo[];

export const todosReducer = createReducer(
  initialState,
  on(addTodo, (state, action) => state.concat([action.todo])),
  on(removeTodo, (state, props) =>
    state.filter((todo) => todo.id !== props.id)
  ),
  on(toggleTodo, (state, props) =>
    state.map((todo) =>
      todo.id !== props.id
        ? todo
        : Object.assign({}, todo, { complete: !todo.complete })
    )
  ),
  on(receiveData, (state, action) => action.todos)
);

export const selectTodos = createSelector(
  getTodosState,
  (state: TodosState) => state
);
