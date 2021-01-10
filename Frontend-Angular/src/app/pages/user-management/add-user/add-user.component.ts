import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../user-management.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  adduserForm: FormGroup;
  subscription: Subscription = new Subscription();
  @Output() close: EventEmitter<any> = new EventEmitter();
  private userId: any;
  modelTitle: string;
  btntext: string;
  submitted = false;

  get userUID() {
    return this.userId;
  }

  @Input()
  set userUID(val) {
    this.userId = val;
  }

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.adduserForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }, Validators.required],
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required]],
      active: [false, [Validators.required]],
      role: ['', Validators.required],
    });
    if (this.userId) {
      this.modelTitle = 'Update User';
      this.btntext = 'Update';
      this.getUserById();
    } else {
      this.modelTitle = 'Create User';
      this.btntext = 'Save';
    }
  }

  get f() { return this.adduserForm.controls; }

  getUserById() {
    this.subscription.add(this.userManagementService.getUserById(this.userId).subscribe((res: any) => {
      if (res) {
        this.adduserForm.patchValue({
          name: res.data.name ? res.data.name : '',
          username: res.data.username ? res.data.username : '',
          email: res.data.email ? res.data.email : '',
          active: res.data.active ? res.data.active : false,
          role: res.data.role ? res.data.role : ''
        })
      }
    }));
  }

  addEditUser() {
    this.submitted = true;
    const obj = {
      name: this.f.name.value,
      username: this.f.username.value,
      email: this.f.email.value,
      active: this.f.active.value,
      role: this.f.role.value
    };
    this.subscription.add(this.userManagementService.editUser(this.userId, obj).subscribe((res: any) => {
      if (res) {
        this.submitted = false;
        this.onClickClose();
      }
    }));
  }

  onClickClose() {
    this.close.emit(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
