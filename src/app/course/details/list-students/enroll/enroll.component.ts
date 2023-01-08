import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

import { StudentService } from '../../../../service/student.service';
import { Student } from '../../../../interface/student.model';

import { CourseService } from '../../../../service/course.service';
import { Course } from '../../../../interface/course.model'

import { EnrolledService } from '../../../../service/enrolled.service';
import { Enrolled } from '../../../../interface/enrolled.model';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit, OnChanges {
  
  @Input() id: any;

  listFiltered: Student[] = [];

  displayedColumns: string[] = ['select', 'id', 'nostudent', 'name', 'surname'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Student>;
  
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();
  
  selection = new SelectionModel<Student>(true, [])

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  course: Course;
  listEnrolled: Enrolled[];
  listStudents: Student[] = [];

  constructor(private Sservice: StudentService,
              private Cservice: CourseService,
              private Eservice: EnrolledService) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true
    
    this.getAllCourses();
    this.getAllEnrolled();
    this.getAllStudents();
  }

  async ngOnInit(): Promise<void> {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true
    
    this.getAllCourses();
    this.getAllEnrolled();
    this.getAllStudents();

    this.Eservice.Refreshrequired.subscribe(res=>{
      this.listEnrolled = []
      this.dataSource.data = []
      this.getAllEnrolled();
      this.getAllStudents(); 
    });
  }

  async getAllCourses(): Promise<any>{
    (await this.Cservice.getCourseByID(this.id).subscribe((response:any) => {
        this.course = response
    }));
  }

  async getAllEnrolled(): Promise<any>{
    (await this.Eservice.getAllEnrolled(this.id).subscribe((response:any) => {
        this.listEnrolled = response
    }));
  }

  async getAllStudents(): Promise<any>{
    (await this.Sservice.getAllStudent().subscribe((response:any) => {
        this.listStudents = response.filter((student: any) => {
          if(student.Degrees_id == this.course.Degrees_id){
            return student;          }

        })        
        this.listFiltered = []
        this.dataSource.data = []
        if(this.listEnrolled){
          for(let student of this.listStudents){
            let bool: boolean = false
            for(let enroll of this.listEnrolled){
              if(student.id == enroll.Students_id){
                bool = true
              }
            }
            if(bool != true) this.listFiltered.push(student)
          }
        }
        else{ this.listFiltered = this.listStudents}
        
        this.dataSource.data = this.listFiltered;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Student): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    
  }
  
  onClick(){
    this.selection.selected.forEach(element => {
      this.Eservice.createEnrolled({Students_id: element.id, Course_id: this.id}).subscribe({
        next: data => {
          this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
          this.message = "The students have been successfully registered."
          this.show = false
          this.dataSource.data = this.dataSource.data.filter((u) => u.id !== element.id);
          return;
        },
        error: error => {
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "Some error occurred"
          this.show = false
          return;
        }
      }) 
    });
    this.selection.clear();
  }


}
