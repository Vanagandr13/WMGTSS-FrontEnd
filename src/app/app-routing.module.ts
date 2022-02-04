import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ModulePageComponent } from './module-page/module-page.component';
import { DatafileBoardPageComponent } from './datafile-board-page/datafile-board-page.component';
import { LoginPageComponent } from './login-page/login-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/homePage', pathMatch: 'full'},
  {path: 'homePage', component: HomePageComponent},
  {path: 'loginPage', component: LoginPageComponent},
  {path: 'modulePage/:moduleId', component: ModulePageComponent},
  {path: 'datafileBoardPage/:moduleId', component: DatafileBoardPageComponent},
  {path: '**', redirectTo: '/homePage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
