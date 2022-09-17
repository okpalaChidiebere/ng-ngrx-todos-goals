import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Goal } from '../actions/goals';
import { Todo } from '../actions/todos';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  @Input() remove: (item: Goal | Todo) => void;
  @Input() toggle: ((id: string) => void) | undefined;
  @Input() items: Observable<Array<Goal | Todo>>;

  constructor() {}

  ngOnInit(): void {}
}
