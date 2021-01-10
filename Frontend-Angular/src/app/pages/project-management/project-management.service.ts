import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProjects() {
    return this.http.get<any>(AppConfig.GetAllProjects);
  }

  addProject(obj) {
    return this.http.post<any>(AppConfig.AddProject, obj)
  }

  editProject(id, obj) {
    return this.http.post<any>(AppConfig.EditProject + id, obj)
  }

  getProjectById(id) {
    return this.http.get<any>(AppConfig.GetSingalProject + '/' + id);
  }
}
