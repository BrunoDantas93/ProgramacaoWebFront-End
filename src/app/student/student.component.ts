import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { StudentService } from '../service/student.service'
import { DegreesService } from '../service/degrees.service'
import { Subject } from 'rxjs';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit  {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'nostudent', 'name', 'surname', 'email', 'Degrees_id', 'actions' ];

  dataSource: MatTableDataSource<any>;
  
  allstudents: any = []
  allDegrees: any = []
  
  selectedDegree: number = -1;
  studentdata: any = [];

  constructor(private service: StudentService,
              private Dservice: DegreesService) { }


  ngOnInit(): void {
    this.getStudents();
    this.getDegrees();
    this.service.Refreshrequired.subscribe(res=>{
      this.getStudents();   
    });  
  }

  setData(data: any): void {
    this.studentdata = data
  }

  getStudents(): void{
    this.service.getAllStudent().subscribe((response:any) => {
      this.allstudents = response;

      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    })
  }

  getDegrees(): void {
    this.Dservice.getAllDegrees().subscribe((response:any) => {
      this.allDegrees = response
    })
  }

  getItem(id:any) {
    return this.allDegrees.filter((item: any) => item.id === id);
  }

  filterByDegree(): void {
    let filtered = this.allstudents.filter((item:any) => {
      if (this.selectedDegree == -1)
        return item;
      else if (this.selectedDegree == item.Degrees_id)
        return item;
    })
    this.dataSource = new MatTableDataSource(filtered);
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
