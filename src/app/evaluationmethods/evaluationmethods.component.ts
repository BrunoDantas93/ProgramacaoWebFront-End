import { Component, OnInit, ViewChild } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


import { EvaluationmethodsService } from '../service/evaluationmethods.service'
import { Evaluationmethods } from '../interface/evaluationmethods.model'



@Component({
  selector: 'app-evaluationmethods',
  templateUrl: './evaluationmethods.component.html',
  styleUrls: ['./evaluationmethods.component.css']
})
export class EvaluationmethodsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'label', 'actions'];
  dataSource: MatTableDataSource<any>;
  
  list:Evaluationmethods[] = [];
  updateData: any = []

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: EvaluationmethodsService){}

  
  ngOnInit(): void {
    this.getAllEvaluationMethod();
    this.service.Refreshrequired.subscribe(res=>{
      this.getAllEvaluationMethod();
    });      
  }

  private async getAllEvaluationMethod() {
    (await this.service.getAllEvaluationMethod()).subscribe((data: any)=>{
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(data)
      return;
    })
  }

  setData(data: any): void {
    this.updateData = data
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    alert(filterValue)
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


