import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Assessments } from '../interface/assessments.model'
 
@Injectable({
  providedIn: 'root'
})
export class AssessmentsService {

  apiUrl = 'http://localhost:8080/assessments';

  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createAssessment(data:any):Observable<Assessments>{
    return this._http.post<Assessments>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getAllAssessment(Course_id: any):Observable<Assessments>{
    return this._http.get<Assessments>(`${this.apiUrl}/${Course_id}`);
  }

  updateAssessments(id: any, data: any): Observable<Assessments>{
    return this._http.put<Assessments>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  deleteAssessments(id: any):Observable<Assessments>{
    return this._http.delete<Assessments>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  deleteAssessmentsByStudent(id: any):Observable<Assessments>{
    return this._http.delete<Assessments>(`${this.apiUrl}/student/${id}`).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
