import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Student } from '../interface/student.model'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'http://localhost:8080/students';
 
  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createStudent(data:any): Observable<Student>{
    return this._http.post<Student>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }
  
  tstEmailStudent(email:any):Observable<Student>{
    return this._http.post<Student>(`${this.apiUrl}/email`, email);
  }

  tstNoStudent(nostudent:any):Observable<Student>{
    return this._http.post<Student>(`${this.apiUrl}/nostudent`, nostudent);
  }

  getAllStudent():Observable<Student>{
    return this._http.get<Student>(`${this.apiUrl}`);
  }

  getAllStudentByDegree(id:any):Observable<Student>{
    return this._http.get<Student>(`${this.apiUrl}/degree/${id}`);
  }

  updateStudent(id: any, data: any): Observable<Student>{
    return this._http.put<Student>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
    
  }

}
