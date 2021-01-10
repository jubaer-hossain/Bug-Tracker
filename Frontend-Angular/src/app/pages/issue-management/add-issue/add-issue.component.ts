import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent implements OnInit {

  pageTitle: string;
  btntext: string;
  issueId: any;
  addIssueForm: FormGroup;
  subscription: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) {
  }

  ngOnInit() {

    this.activatedRoute
      .queryParams
      .subscribe(params => {
        if (params.issueId) {
          this.issueId = params.issueId;
        }
      });
    this.fromInit();
    if (this.issueId) {
      this.pageTitle = 'Update Issue';
      this.btntext = 'Update';
    } else {
      this.pageTitle = 'Create Issue';
      this.btntext = 'Save';
    }
  }

  fromInit() {
    this.addIssueForm = this.formBuilder.group({
      projectId: ['', Validators.required],
      issueName: ['', Validators.required],
      description: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
      priority: ['', Validators.required],
      status: ['', [Validators.required]],
      deadline: [new Date(), [Validators.required]],
      attachment: ['', Validators.required],
    });
  }

  goBack() {
    this.location.back();
  }

}
