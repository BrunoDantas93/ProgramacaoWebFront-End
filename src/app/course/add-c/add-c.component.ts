import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DegreesService } from '../../service/degrees.service'
import { SchoolyearService } from '../../service/schoolyear.service'
import { CourseService } from '../../service/course.service'

import { Degrees } from '../../interface/degrees.model'
import { Schoolyear } from '../../interface/schoolyear.model'
import { Course } from '../../interface/course.model'

@Component({
  selector: 'app-add-c',
  templateUrl: './add-c.component.html',
  styleUrls: ['./add-c.component.css']
})
export class AddCComponent implements OnInit {

  courseForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    SchoolYear_id: new FormControl(''),
    Degrees_id: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  listDegrees: Degrees[] = [];
  ListSchoolYears: Schoolyear[] = [];

  TeacherID: string | null; 
  
  constructor(private formBuilder: FormBuilder,
              private Cservice: CourseService,
              private Dservice: DegreesService,
              private Sservice: SchoolyearService) { }

  ngOnInit(): void {
    this.TeacherID = localStorage.getItem('token');
    this.getAllDegrees();
    this.getAllSchoolYears();

    this.courseForm = this.formBuilder.group({
      name: ['', Validators.required],
      SchoolYear_id: [null,  Validators.required],
      Degrees_id: [null, Validators.required],
    })  
  }

  private async getAllDegrees() {
    (await this.Dservice.getAllDegrees()).subscribe((data: any)=>{
      this.listDegrees = data;  
    })
  }

  private async getAllSchoolYears() {
    (await this.Sservice.getAllSchoolYear()).subscribe((data: any)=>{
      this.ListSchoolYears = data;  
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.courseForm.controls;
  }

  onSubmit(){
    this.submitted = true;    
    if (this.courseForm.invalid) {
      return;
    }
    let course: Course = this.courseForm.value
    course.Teachers_id = this.TeacherID;

    
    this.Cservice.createCourse(course).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The course was created successfully"
        this.show = false
        this.onReset();
        return;
      },
      error: error => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred"
        this.show = false
        this.onReset();
        return;
      }
    }) 
  }

  onReset(): void {
    this.submitted = false;
    this.courseForm.reset();
  }

}
