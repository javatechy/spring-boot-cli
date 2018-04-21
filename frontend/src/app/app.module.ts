import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoutesModule} from './app.routes';

import {
  MatButtonModule,
  MatCheckboxModule, MatFormFieldControl, MatFormFieldModule, MatInputModule,
  MatNativeDateModule, MatSnackBarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HelperService} from './services/helper.service';
import { LocationStrategy, PathLocationStrategy} from '@angular/common';
import {LoginService} from './services/login.service';
import {CodeComponent} from './code/code.component';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
    declarations: [AppComponent, CodeComponent],
  imports: [
    BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
    MatNativeDateModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    //MatFormFieldControl,
    MatSnackBarModule,
    MatInputModule,
    RoutesModule,
    MatButtonModule
],
  bootstrap: [AppComponent],
  providers: [HelperService, LoginService,
    {provide: LocationStrategy, useClass: PathLocationStrategy}
  ]
})
export class AppModule { }
