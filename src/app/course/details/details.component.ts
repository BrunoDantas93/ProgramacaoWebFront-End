import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DegreesService } from '../../service/degrees.service'
import { SchoolyearService } from '../../service/schoolyear.service'
import { CourseService } from '../../service/course.service'
import { EnrolledService } from '../../service/enrolled.service'

import { Degrees } from '../../interface/degrees.model'
import { Schoolyear } from '../../interface/schoolyear.model'
import { Course } from '../../interface/course.model'
import { Enrolled } from '../../interface/enrolled.model'
import { data } from 'jquery';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {



  TeacherID: string | null; 
  TeacherName: string | null; 
  Course_ID: string | null; 
  returnUrl: string;

  listDegrees: Degrees[] = [];
  ListSchoolYears: Schoolyear[] = [];
  list: Course;
  updateData: any = []
  dataSummary: any = []
  totalStudents: number = 0

  constructor(private route: ActivatedRoute,  
              private Dservice: DegreesService,
              private Sservice: SchoolyearService,
              private service: CourseService,
              private Eservice: EnrolledService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    this.list = {'id':"0","name":"aaa","Degrees_id":"-1","Teachers_id":"-1","SchoolYear_id":"-1"}
    this.TeacherID = localStorage.getItem('token');
    this.TeacherName = localStorage.getItem('name')+" "+localStorage.getItem('surname');
    this.Course_ID = this.route.snapshot.paramMap.get('id');
    this.getAllDegrees();
    this.getAllSchoolYears();
    this.getCourse();
    this.getEnrolled();

    this.Eservice.Refreshrequired.subscribe(res=>{
      this.getEnrolled();    
    });

    this.service.Refreshrequired.subscribe(res=>{
      this.getCourse();    
    });

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

  getAllSchoolYear(id:any) {
    return this.ListSchoolYears.filter((item: any) => item.id === id);
  }

  private async getCourse() {
    (await this.service.getCourseByID(this.Course_ID)).subscribe({
      next: data => {
        this.list = (data)
        if(this.TeacherID != data.Teachers_id)
          this.router.navigate(['/dashboard']); 
      },
      error: error => {
        this.router.navigate(['/dashboard']); 
        return;
      }
    });
  }

  private async getEnrolled() {
    (await this.Eservice.getAllEnrolled(this.Course_ID)).subscribe({
      next: (data:any) => {
        this.totalStudents = data.length;
      },
      error: error => {
        return;
      }
    });
  }
  
  setData(data: any): void {
    this.updateData = data
  }
 
}
