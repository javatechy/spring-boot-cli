import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {AppComponent} from './app.component';
import {CodeComponent} from './code/code.component';

export const routes: Routes = [
  {path: '', component: AppComponent},
  {path: 'code', component: CodeComponent},

];

export const RoutesModule: ModuleWithProviders = RouterModule.forRoot(routes,
  {preloadingStrategy: PreloadAllModules});

