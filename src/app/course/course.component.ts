import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../service/auth.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DegreesService } from '../service/degrees.service'
import { SchoolyearService } from '../service/schoolyear.service'
import { CourseService } from '../service/course.service'

import { Degrees } from '../interface/degrees.model'
import { Schoolyear } from '../interface/schoolyear.model'
import { Course } from '../interface/course.model'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'Degrees_id', 'SchoolYear_id', 'actions'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  TeacherID: string | null; 
  returnUrl: string;

  listDegrees: Degrees[] = [];
  ListSchoolYears: Schoolyear[] = [];
  list:Course[] = [];
  listFiltered: any = []
  updateData: any = []

  selectedDegree: number = -1;
  selectedSchoolYear: number = -1;
  

  constructor(private router: Router, 
              private authService: AuthService,
              private Dservice: DegreesService,
              private Sservice: SchoolyearService,
              private service: CourseService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.TeacherID = localStorage.getItem('token');
    this.getAllDegrees();
    this.getAllSchoolYears();
    this.getAllCourses();

    this.service.Refreshrequired.subscribe(res=>{
      this.getAllDegrees();
      this.getAllSchoolYears();
      this.getAllCourses(); 
    }); 
  }

  Myfilter(): void {
    let filtered = this.listFiltered.filter((item:any) => {
      if (this.selectedDegree == -1 && this.selectedSchoolYear == -1)
        return item;
      else if (this.selectedDegree == item.Degrees_id && this.selectedSchoolYear == -1)
        return item;
      else if (this.selectedDegree == -1 && this.selectedSchoolYear == item.SchoolYear_id)
        return item;
      else if (this.selectedDegree == item.Degrees_id && this.selectedSchoolYear == item.SchoolYear_id)
        return item;
    })
    this.dataSource = new MatTableDataSource(filtered);
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  private async getAllDegrees() {
    (await this.Dservice.getAllDegrees()).subscribe((data: any)=>{
      this.listDegrees = data;  
    })
  }

  getDegree(id:any) {
    return this.listDegrees.filter((item: any) => item.id === id);
  }


  private async getAllSchoolYears() {
    (await this.Sservice.getAllSchoolYear()).subscribe((data: any)=>{
      this.ListSchoolYears = data;  
    })
  }

  getSchoolYear(id:any) {
    return this.ListSchoolYears.filter((item: any) => item.id === id);
  }

  private async getAllCourses() {
    (await this.service.getAllCourse(this.TeacherID)).subscribe(async (data: any)=>{
      this.list = [];
      this.list = data;  
      this.listFiltered = [];
      (await this.list.filter(async (item:Course) =>{
        let degree:any = this.getDegree(item.Degrees_id);
        let schoolyear: any = this.getSchoolYear(item.SchoolYear_id);
        this.listFiltered.push({'id':item.id, 'name':item.name, 'Degrees_id':item.Degrees_id, 'Dname':degree[0].name, 'SchoolYear_id':item.SchoolYear_id, 'SchoolYear':schoolyear[0].label});
        return;
      })  ) 
      this.dataSource = new MatTableDataSource(this.listFiltered)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    })
  }

  setData(data: any): void {
    this.updateData = data
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
