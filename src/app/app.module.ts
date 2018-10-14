import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GradebookComponent } from './components/gradebook/gradebook.component';

import { GradebookService } from './services/gradebook.service';


@NgModule({
  declarations: [
    AppComponent,
    GradebookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
    //FontAwesomeModule
  ],
  providers: [
    GradebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
