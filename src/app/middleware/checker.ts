import { ActionReducer } from '@ngrx/store';

import { addGoal } from '../actions/goals';
import { addTodo } from '../actions/todos';
import { AppState } from '../reducers';

export default function checker(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action: ReturnType<typeof addTodo | typeof addGoal>) {
    if (
      action.type === '[Todo] Add' &&
      action.todo.name.toLowerCase().includes('bitcoin')
    ) {
      alert("Nope. That's a bad idea.");
      return state;
    }

    if (
      action.type === '[Goal] Add' &&
      action.goal.name.toLowerCase().includes('bitcoin')
    ) {
      alert("Nope. That's a bad idea.");
      return state;
    }

    return reducer(state, action);
  };
}
