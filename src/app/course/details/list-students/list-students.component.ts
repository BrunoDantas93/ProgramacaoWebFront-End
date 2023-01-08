import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { StudentService } from '../../../service/student.service';
import { Student } from '../../../interface/student.model';

import { EnrolledService } from '../../../service/enrolled.service';
import { Enrolled } from '../../../interface/enrolled.model';

import { AssessmentsService } from '../../../service/assessments.service';
import { Assessments } from '../../../interface/assessments.model';

import { QuotationService } from '../../../service/quotation.service';
import { Quotation } from '../../../interface/quotation.model';

import { EvaluationmethodsService } from '../../../service/evaluationmethods.service';


@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.css']
})
export class ListStudentsComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'nostudent', 'name', 'final', 'actions'];
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  //dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Course_ID: string | null;
  listAllStudents: Student[] = [];
  lsitAllEnrolled: Enrolled[] = [];
  listAllAssessments: Assessments[] = [];
  listAllQuotation: Quotation[] = [];
  listFiltered: any = [];
  updateData: any = []


  constructor(private route: ActivatedRoute,  
              private Sservice: StudentService,
              private Eservice: EnrolledService,
              private Aservice: AssessmentsService,
              private Qservice: QuotationService,
              private EMservice: EvaluationmethodsService) { }

  async ngOnInit(): Promise<void> {    
    this.Course_ID = this.route.snapshot.paramMap.get('id');   
    this.getAllStudents();
    this.getAllAssessments();
    this.getAllQuotation();
    this.getAllEnrolled();  

    this.Eservice.Refreshrequired.subscribe(res=>{
      this.lsitAllEnrolled = [];
      this.dataSource.data = [];
      this.getAllAssessments();
      this.getAllQuotation();
      this.getAllEnrolled();    
    });

    this.Aservice.Refreshrequired.subscribe(res=>{
      this.lsitAllEnrolled = [];
      this.dataSource.data = [];
      this.getAllAssessments();
      this.getAllQuotation();
      this.getAllEnrolled();    
    });
    
    this.Qservice.Refreshrequired.subscribe(res=>{
      this.lsitAllEnrolled = [];
      this.listAllQuotation = [];
      this.dataSource.data = [];
      this.getAllAssessments();
      this.getAllQuotation();
      this.getAllEnrolled();    
    });

    this.EMservice.Refreshrequired.subscribe(res=>{
      this.lsitAllEnrolled = [];
      this.listAllQuotation = [];
      this.dataSource.data = [];
      this.getAllAssessments();
      this.getAllQuotation();
      this.getAllEnrolled();    
    });
  }

  async getAllStudents() {
    (await this.Sservice.getAllStudent().subscribe((response:any) => {
      this.listAllStudents = response;
    }));
  }

  async getAllAssessments() {
    (await this.Aservice.getAllAssessment(this.Course_ID).subscribe((response:any) => {
      this.listAllAssessments = response;
    }));
  }

  async getAllEnrolled() {
    (await this.Eservice.getAllEnrolled(this.Course_ID).subscribe(async (response:any) => {
      this.lsitAllEnrolled = response;
      this.listFiltered = [];
      this.dataSource.data = [];

      (await this.lsitAllEnrolled.filter(async (item:Enrolled) =>{
        let student:any = this.getStudent(item.Students_id);
        const nostudent = student[0].nostudent;
        const name = student[0].name+" "+student[0].surname

        let final: number = this.getFinalGrade(item.Students_id);
        this.listFiltered.push({'id':item.id, 'nostudent':nostudent, 'name':name, 'final':final, 'Students_id':item.Students_id, 'Course_id':item.Course_id});
      })  )  
      this.dataSource.data = this.listFiltered;
      //this.dataSource = new MatTableDataSource(this.listFiltered)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }));
  }

 async getAllQuotation() {
  (await this.Qservice.getAllQuotation(this.Course_ID).subscribe((response:any) => {
      this.listAllQuotation = response;
  }));
 }

  getStudent(Student_ID:any){
    return this.listAllStudents.filter((item: any) => item.id === Student_ID);
  }

  getFinalGrade(Student_ID:any){
    let Grade: number = 0
    let final = this.listAllAssessments.filter((item: any) => {
      if(item.Enrolled_Students_id == Student_ID){
        this.listAllQuotation.filter((per:any) => {
          if(per.id == item.Quotation_id){
            Grade += item.Grade * per.percentage
            return;
          }
        })
        return;
      }
    })
    return parseFloat(Grade.toFixed(2))
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
