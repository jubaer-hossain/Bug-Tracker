import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(
    private http: HttpClient
  ) { }


  getAllUser() {
    return this.http.get<any>(AppConfig.GetAllUser);
  }

  getUserById(id) {
    return this.http.get<any>(AppConfig.GetUserById + id);
  }

  editUser(id, obj) {
    return this.http.post<any>(AppConfig.EditUser + id, obj);
  }

}
