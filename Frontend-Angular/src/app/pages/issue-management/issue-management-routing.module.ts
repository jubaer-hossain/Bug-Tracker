import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { AddIssueComponent } from './add-issue/add-issue.component';

const routes: Routes = [
  {
    path: 'list',
    component: IssueListComponent
  },

  {
    path: 'list/:id',
    component: IssueListComponent
  },

  {
    path: 'add',
    component: AddIssueComponent
  },
  {
    path: 'edit',
    component: AddIssueComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssueManagementRoutingModule { }
