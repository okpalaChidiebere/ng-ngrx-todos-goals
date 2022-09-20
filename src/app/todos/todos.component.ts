import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Todo, TodoHandlers } from '../actions/todos';
import { AppState } from '../reducers';
import { selectTodos, TodosState } from '../reducers/todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Observable<TodosState>;
  @ViewChild('inputRef') input: ElementRef;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos = this.store.pipe(select(selectTodos));
  }

  addItem() {
    this.store.dispatch(
      TodoHandlers.addTodo(
        this.input.nativeElement.value,
        () => (this.input.nativeElement.value = '')
      )
    );
  }

  removeItem = (todo: Todo) => {
    this.store.dispatch(TodoHandlers.removeTodo(todo));
  };

  toggleItem = (id: string) => {
    this.store.dispatch(TodoHandlers.toggleTodo(id));
  };
}
