import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssueManagementRoutingModule } from './issue-management-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { NgbModalModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [IssueListComponent, AddIssueComponent],
  imports: [
    CommonModule,
    IssueManagementRoutingModule,
    NgbModalModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class IssueManagementModule { }
