import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OutputComponent } from './output/output.component';

const routes: Routes = [
  {
    path: '',
    component: OutputComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
