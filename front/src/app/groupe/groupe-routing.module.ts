import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ImportComponent } from './import/import.component';

const routes: Routes = [
  { path: 'groupe', redirectTo: 'groupe/index', pathMatch: 'full'},
  { path: 'groupe/index', component: IndexComponent },
  { path: 'groupe/:groupeId/view', component: ViewComponent },
  { path: 'groupe/create', component: CreateComponent },
  { path: 'groupe/:groupeId/edit', component: EditComponent },
  { path: 'groupe/import', component: ImportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupeRoutingModule { }
