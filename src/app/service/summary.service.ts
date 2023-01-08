import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Summary } from '../interface/summary.model'


@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  
  apiUrl = 'http://localhost:8080/summaries';
 
  constructor(private _http: HttpClient) { }
  
  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createSummary(data:any):Observable<Summary>{
    return this._http.post<Summary>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getSummary(Course_ID: any):Observable<Summary>{
    return this._http.get<Summary>(`${this.apiUrl}/${Course_ID}`);
  }

  deleteSummary(id: any):Observable<Summary>{
    return this._http.delete<Summary>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  updateSummary(id: any, data: any): Observable<Summary>{
    return this._http.put<Summary>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
