import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppStore } from './reducers';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppStore],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
