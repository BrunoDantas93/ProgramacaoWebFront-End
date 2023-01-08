import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Course } from '../interface/course.model'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  apiUrl = 'http://localhost:8080/courses';

  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createCourse(data:any):Observable<Course>{
    return this._http.post<Course>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getAllCourse(Teacher_id: any):Observable<Course>{
    return this._http.get<Course>(`${this.apiUrl}/${Teacher_id}`);
  }

  getCourseByID(id: any):Observable<Course>{
    return this._http.get<Course>(`${this.apiUrl}/course/${id}`);
  }

  updateCourse(id: any, data: any): Observable<Course>{
    return this._http.put<Course>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

}
