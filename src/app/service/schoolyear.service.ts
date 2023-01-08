import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Schoolyear } from '../interface/schoolyear.model'

@Injectable({
  providedIn: 'root'
})
export class SchoolyearService {

  apiUrl = 'http://localhost:8080/schoolyears';

  constructor(private _http: HttpClient) { }

  
  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }


  createSchoolYear(data:any):Observable<Schoolyear>{
    return this._http.post<Schoolyear>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getAllSchoolYear():Observable<Schoolyear>{
    return this._http.get<Schoolyear>(`${this.apiUrl}`);
  }

  updateSchoolYear(id: any, data: any): Observable<Schoolyear>{
    return this._http.put<Schoolyear>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
