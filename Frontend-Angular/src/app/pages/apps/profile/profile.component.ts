import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserManagementService } from '../../user-management/user-management.service';
import { ActivatedRoute } from '@angular/router';
import { AppsService } from '../apps.service';
import { CookieService } from 'src/app/core/services/cookie.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  submitted = false;
  error: any;
  success: any;
  userId: any;
  user: any;
  changePasswordForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private appService: AppsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        if (params.userId) {
          this.userId = params.userId;
        }
      });
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
    this.getUserById();
  }

  get f() { return this.changePasswordForm.controls; }

  getUserById() {
    this.subscription.add(this.userManagementService.getUserById(this.userId).subscribe((res: any) => {
      if (res) {
        this.user = res.data;
      }
    }));
  }

  updatePassword() {
    this.submitted = true;
    const obj = {
      email: this.user.email,
      password: this.f.newPassword.value
    };
    this.subscription.add(this.appService.changesPassword(obj).subscribe((res) => {
      this.submitted = false;
      this.success = res.message;
    }, (error) => {
      this.error = error;
    }));
  }

}
