import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DegreesService } from '../service/degrees.service'
import { Degrees } from '../interface/degrees.model'
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.css']
})
export class DegreesComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  list:Degrees[] = [];

  returnUrl: string
  updateID: string;

  constructor(private router: Router, 
              private service: DegreesService) { } 

  async ngOnInit(): Promise<void> {
    this.updateID = "-1";
    this.returnUrl = '/dashboard'; 
    
    if(localStorage.getItem('isLoggedIn') != "true")
      this.router.navigate([this.returnUrl]);
    
    this.getAllDegrees();

    this.service.Refreshrequired.subscribe(res=>{
      this.getAllDegrees();   
    }); 
  }  

  private async getAllDegrees() {
    (await this.service.getAllDegrees()).subscribe((data: any)=>{
      this.list = data;  
      this.dataSource = new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setID(data: any): void {
    this.updateID = data
  }
}
