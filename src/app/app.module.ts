import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppStore } from './reducers';
import { GoalsComponent } from './goals/goals.component';
import { TodosComponent } from './todos/todos.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AppComponent, GoalsComponent, TodosComponent, ListComponent],
  imports: [BrowserModule, AppStore],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
