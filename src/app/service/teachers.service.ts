import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  apiUrl = 'http://localhost:8080/teachers';
  constructor(private _http: HttpClient) { }

  createTeacher(data:any):Observable<any>{
    return this._http.post(`${this.apiUrl}`, data);
  }

  loginTeacher(data:any):Observable<any>{
    return this._http.post(`${this.apiUrl}/login`, data);
  }

  tstemail(email:any):Observable<any>{
    console.log(email);
    return this._http.post(`${this.apiUrl}/email`, email);
  }
}
