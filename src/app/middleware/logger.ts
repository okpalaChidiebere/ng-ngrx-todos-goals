import { ActionReducer } from '@ngrx/store';
import { AppState } from '../reducers';

export default function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (store, action) {
    const state = store;
    console.group(action.type);
    console.log('The action: ', action);
    const result = reducer(state, action);
    console.log('The new state: ', result);
    console.groupEnd();

    return result;
  };
}
