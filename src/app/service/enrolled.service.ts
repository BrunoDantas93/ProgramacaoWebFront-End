import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Enrolled } from '../interface/enrolled.model'

@Injectable({
  providedIn: 'root'
})
export class EnrolledService {
  
  apiUrl = 'http://localhost:8080/enrolled';

  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createEnrolled(data:any):Observable<Enrolled>{
    return this._http.post<Enrolled>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getAllEnrolled(Course_id: any):Observable<Enrolled>{
    return this._http.get<Enrolled>(`${this.apiUrl}/${Course_id}`);
  }

  deleteEnrolledByStudent(id: any):Observable<Enrolled>{
    return this._http.delete<Enrolled>(`${this.apiUrl}/student/${id}`).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
