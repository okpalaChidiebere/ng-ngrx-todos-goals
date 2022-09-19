import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Goal, handleAddGoal, handleDeleteGoal } from '../actions/goals';

import { AppState } from '../reducers';
import { GoalsState, selectGoals } from '../reducers/goals';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  goals: Observable<GoalsState> = this.store.pipe(select(selectGoals));
  @ViewChild('inputRef') input: ElementRef;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {}

  addItem() {
    this.store.dispatch(
      handleAddGoal(
        this.input.nativeElement.value,
        () => (this.input.nativeElement.value = '')
      )
    );
  }

  /**
   * NOTE: it must be a callback; because that what we are passing to the
   * List component as input.
   * When i made this a closed function dispatch was undefined
   */
  removeItem = (goal: Goal) => {
    this.store.dispatch(handleDeleteGoal(goal));
  };

  generateID() {
    return (Math.random() + 1).toString(36).substring(7);
  }
}
