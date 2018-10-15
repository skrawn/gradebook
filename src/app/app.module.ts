import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { GradebookComponent } from './components/gradebook/gradebook.component';
import { GradebookService } from './services/gradebook.service';



@NgModule({
  declarations: [
    AppComponent,
    GradebookComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    GradebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
