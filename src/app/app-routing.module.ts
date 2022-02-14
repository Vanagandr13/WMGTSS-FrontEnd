// External Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

// Internal Imports
import { HomePageComponent } from './home-page/home-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { DatafileBoardPageComponent } from './datafile-board-page/datafile-board-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './helpers/auth-guard';

// Set up routes for the application. 
const routes: Routes = [
  {path: '', redirectTo: '/homePage', pathMatch: 'full'},
  {path: 'homePage', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: 'loginPage', component: LoginPageComponent},
  {path: 'modulePage/:moduleId', component: ModulePageComponent, canActivate: [AuthGuard]},
  {path: 'datafileBoardPage/:moduleId', component: DatafileBoardPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/homePage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
