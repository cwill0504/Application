import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'main', component:MainComponent},
  {path:'application/:id', component:ApplicationComponent},
  {path: 'application', component:ApplicationComponent}, 
  {path: '**', redirectTo:'main', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
