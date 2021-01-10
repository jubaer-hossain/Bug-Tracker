import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/apps', pathMatch: 'full' },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user', loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule) },
  { path: 'project', loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule) },
  { path: 'issue', loadChildren: () => import('./issue-management/issue-management.module').then(m => m.IssueManagementModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
