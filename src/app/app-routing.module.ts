import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'main', component:MainComponent},
  {path:'applications/:id', component:ApplicationsComponent},
  {path: '**', redirectTo:'main', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
