import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import {
  NgbDropdownModule, NgbModalModule, NgbTypeaheadModule,
  NgbPaginationModule, NgbProgressbarModule, NgbTooltipModule, NgbAlertModule
} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './apps-routing.module';

import { UIModule } from '../../shared/ui/ui.module';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketsSortableDirective } from './tickets/tickets-sortable.directive';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [TicketsComponent, TicketsSortableDirective, ProfileComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbDropdownModule,
    UIModule,
    FormsModule,
    NgbModalModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    NgbTypeaheadModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbAlertModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]

})
export class AppsModule { }
