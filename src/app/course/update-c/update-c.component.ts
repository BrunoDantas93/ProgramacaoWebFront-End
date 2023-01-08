import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DegreesService } from '../../service/degrees.service'
import { SchoolyearService } from '../../service/schoolyear.service'
import { CourseService } from '../../service/course.service'
import { EnrolledService } from '../../service/enrolled.service'

import { Degrees } from '../../interface/degrees.model'
import { Schoolyear } from '../../interface/schoolyear.model'
import { Course } from '../../interface/course.model'
import { Enrolled } from '../../interface/enrolled.model'

@Component({
  selector: 'app-update-c',
  templateUrl: './update-c.component.html',
  styleUrls: ['./update-c.component.css']
})
export class UpdateCComponent implements OnInit, OnChanges {
  
  @Input() id: any;

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
  listEnrolled: Enrolled[] = [];

  TeacherID: string | null; 
  
  constructor(private formBuilder: FormBuilder,
              private Cservice: CourseService,
              private Dservice: DegreesService,
              private Eservice: EnrolledService,
              private Sservice: SchoolyearService) { }


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.submitted = false;
    this.message = "";
    this.listEnrolled = []    
    this.type = "";
    this.show = true;
    
    if(this.id.id != undefined)
      (await this.getAllEnrolled());
     
    this.courseForm.patchValue({
      name: this.id.name,
      SchoolYear_id: this.id.SchoolYear_id,
      Degrees_id: this.id.Degrees_id
    })
  }


  ngOnInit(): void {
    
    this.getAllDegrees();
    this.getAllSchoolYears();

    this.courseForm = this.formBuilder.group({
      name: [null, Validators.required],
      SchoolYear_id: ['', [Validators.required]],
      Degrees_id: ['', [Validators.required]]
    });
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
  
  async getAllEnrolled() {
    const Degrees_id = this.courseForm.get('Degrees_id');
    this.listEnrolled = [];
    (await this.Eservice.getAllEnrolled(this.id.id)).subscribe(async (data: any)=>{  
      this.listEnrolled = data;
      if(this.listEnrolled.length > 0){
        Degrees_id?.disable();
      }
      return;
    }, async (err:any) => {Degrees_id?.enable();});
    
    
    /* 
    console.log("=>",this.listEnrolled)
   
    else{
      Degrees_id?.enable();
    }  */
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
    course.Teachers_id = this.id.Teachers_id;

    this.Cservice.updateCourse(this.id.id, course).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The course data has been successfully changed!"
        this.show = false
        return;
      },
      error: error => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred"
        this.show = false
        return;
      }
    });  
    
  }

}
