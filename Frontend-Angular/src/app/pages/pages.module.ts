import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
// import { DashboardsModule } from './dashboards/dashboards.module';
import { AppsModule } from './apps/apps.module';
import { PagesRoutingModule } from './pages-routing.module';
import { UserManagementModule } from './user-management/user-management.module';
import { ProjectManagementModule } from './project-management/project-management.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDropdownModule,
    // DashboardsModule,
    AppsModule,
    PagesRoutingModule,
    UserManagementModule,
    ProjectManagementModule
  ]
})
export class PagesModule { }
