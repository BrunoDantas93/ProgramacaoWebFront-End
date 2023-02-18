import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Teacher } from '../interface/teacher.model'

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  apiUrl = 'https://localhost:7051/api/User';
  //apiUrl = 'http://localhost:8080/teachers';
  constructor(private _http: HttpClient) { }

  createTeacher(data:any):Observable<Teacher>{
    return this._http.post<Teacher>(`${this.apiUrl}`, data);
  }

  loginTeacher(data:any):Observable<any>{
    return this._http.post(`${this.apiUrl}/Login`, data);
  }

  tstemail(email:any):Observable<Teacher>{
    return this._http.post<Teacher>(`${this.apiUrl}/email`, email);
  }

  getTeacher(id: any):Observable<Teacher>{
    return this._http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  updateTeacher(id: any, data: any): Observable<Teacher>{
    return this._http.put<Teacher>(`${this.apiUrl}/${id}`,data);
  }
}
