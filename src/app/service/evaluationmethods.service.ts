import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Evaluationmethods } from '../interface/evaluationmethods.model'

@Injectable({
  providedIn: 'root'
})
export class EvaluationmethodsService {

  apiUrl = 'http://localhost:8080/evaluationmethods';
 
  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  createEvaluationMethod(data:any): Observable<Evaluationmethods>{
    return this._http.post<Evaluationmethods>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }
  
  getAllEvaluationMethod():Observable<Evaluationmethods>{
    return this._http.get<Evaluationmethods>(`${this.apiUrl}`);
  }

  updateEvaluationMethod(id: any, data: any): Observable<Evaluationmethods>{
    return this._http.put<Evaluationmethods>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
    
  }
}
