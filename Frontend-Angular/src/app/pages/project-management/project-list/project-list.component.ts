import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProjectManagementService } from '../project-management.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projectId: any;
  projects: [] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private projectManagementService: ProjectManagementService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.subscription.add(this.projectManagementService.getAllProjects().subscribe((res: any) => {
      if (res && res.data) {
        this.projects = res.data;
      }
    }));
  }

  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  closeModel(event) {
    if (event) {
      this.modalService.dismissAll();
      this.getAllProjects();
      this.projectId = null;
    }
  }

  editProject(id, content) {
    this.projectId = id;
    this.openModal(content);
  }

  openIssues(id) {
    this.router.navigate(['/app/issue/list', id])
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
