import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  constructor(
    private http: HttpClient
  ) { }

  changesPassword(obj) {
    return this.http.post<any>(AppConfig.ChangePasssword, obj);
  }
}
