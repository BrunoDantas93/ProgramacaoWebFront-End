import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Degrees } from '../interface/degrees.model'

@Injectable({
  providedIn: 'root'
})
export class DegreesService {
  apiUrl = 'http://localhost:8080/degrees';

  constructor(private _http: HttpClient) { }

  
  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createDegree(data:any):Observable<Degrees>{
    return this._http.post<Degrees>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }
  
  getAllDegrees():Observable<Degrees>{
    return this._http.get<Degrees>(`${this.apiUrl}`);
  }

  updateDegree(id: any, data: any): Observable<Degrees>{
    return this._http.put<Degrees>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

}
