import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectManagementService } from '../project-management.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  addProjectForm: FormGroup;
  subscription: Subscription = new Subscription();
  @Output() close: EventEmitter<any> = new EventEmitter();
  private projectId: any;
  modelTitle: string;
  btntext: string;
  submitted = false;

  get projectUID() {
    return this.projectId;
  }

  @Input()
  set projectUID(val) {
    this.projectId = val;
  }

  constructor(
    private formBuilder: FormBuilder,
    private projectManagementService: ProjectManagementService
  ) { }

  ngOnInit() {
    this.addProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      status: ['running', [Validators.required]],
    });
    if (this.projectId) {
      this.modelTitle = 'Update Project';
      this.btntext = 'Update';
      this.getProjectById();
    } else {
      this.modelTitle = 'Create Project';
      this.btntext = 'Save';
    }
  }

  getProjectById() {
    this.subscription.add(this.projectManagementService.getProjectById(this.projectId).subscribe((res: any) => {
      if (res) {
        this.f.name.setValue(res.data.name);
        this.f.description.setValue(res.data.description);
        this.f.status.setValue(res.data.status);
      }
    }));
  }

  get f() { return this.addProjectForm.controls; }

  onClickClose() {
    this.close.emit(true);
  }

  addEditProject() {
    this.submitted = true;
    if (this.addProjectForm.invalid) {
      return;
    }
    if (this.projectId) {
      const obj = {
        name: this.f.name.value,
        description: this.f.description.value,
        status: this.f.status.value,
      };
      this.subscription.add(this.projectManagementService.editProject(this.projectId, obj).subscribe((res: any) => {
        if (res) {
          this.onClickClose();
        }
      }));
    } else {
      const obj = {
        name: this.f.name.value,
        description: this.f.description.value,
        status: this.f.status.value,
      };
      this.subscription.add(this.projectManagementService.addProject(obj).subscribe((res: any) => {
        if (res) {
          this.onClickClose();
        }
      }));
    }
  }
}
