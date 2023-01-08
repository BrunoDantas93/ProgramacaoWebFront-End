import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { SchoolyearService } from '../service/schoolyear.service'
import { Schoolyear } from '../interface/schoolyear.model'


@Component({
  selector: 'app-schoolyear',
  templateUrl: './schoolyear.component.html',
  styleUrls: ['./schoolyear.component.css']
})
export class SchoolyearComponent implements OnInit {

  displayedColumns: string[] = ['id', 'label', 'actions'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  returnUrl: string
  list:Schoolyear[] = [];
  updateData: any = []

  constructor(private service: SchoolyearService) { } 

  ngOnInit(): void {
    this.getAllSchoolYears();
    
    this.service.Refreshrequired.subscribe(res=>{
      this.getAllSchoolYears();   
    }); 
  } 

  private async getAllSchoolYears() {
    (await this.service.getAllSchoolYear()).subscribe(((data: any)=>{
      this.list = data;  
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    }));
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setID(data: any): void {
    this.updateData = data
  }

}
