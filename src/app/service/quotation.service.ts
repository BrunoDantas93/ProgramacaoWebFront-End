import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject, tap } from 'rxjs';
import { Quotation } from '../interface/quotation.model'

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  apiUrl = 'http://localhost:8080/quotation';

  constructor(private _http: HttpClient) { }

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  
  createQuotation(data:any):Observable<Quotation>{
    return this._http.post<Quotation>(`${this.apiUrl}`, data).pipe(
      tap(data => this.Refreshrequired.next()),
    );
  }

  getAllQuotation(Course_id: any):Observable<Quotation>{
    return this._http.get<Quotation>(`${this.apiUrl}/${Course_id}`);
  }

  updateQuotation(id: any, data: any): Observable<Quotation>{
    return this._http.put<Quotation>(`${this.apiUrl}/${id}`,data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  deleteQuotation(id: any):Observable<Quotation>{
    return this._http.delete<Quotation>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
