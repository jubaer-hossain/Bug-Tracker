import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  userId: any;
  users: [] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private userManagementService: UserManagementService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.subscription.add(this.userManagementService.getAllUser().subscribe((res: any) => {
      if (res && res.data) {
        this.users = res.data;
      }
    }));
  }

  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  closeModel(event) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllUsers();
      this.userId = null;
    }
  }

  editUser(id, content) {
    this.userId = id;
    this.openModal(content);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
