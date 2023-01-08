import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { AssessmentsService } from '../../../../service/assessments.service';
import { Assessments } from '../../../../interface/assessments.model';

import { EnrolledService } from '../../../../service/enrolled.service';
import { Enrolled } from '../../../../interface/enrolled.model';


@Component({
  selector: 'app-remove-student',
  templateUrl: './remove-student.component.html',
  styleUrls: ['./remove-student.component.css']
})
export class RemoveStudentComponent implements OnInit, OnChanges {
  
  @Input() id: any;
    
  message: string
  type: string
  show: boolean = true
  assessments: number = 0;

  constructor(private Aservice: AssessmentsService,
              private Eservice: EnrolledService) { }

  ngOnChanges(): void {
    this.message = ""
    this.type = ""
    this.show = true
    this.assessments = 0
    if(this.id.Course_id !== undefined){
      this.getAssessments();
    }
  }

  ngOnInit(): void {
  }

  async getAssessments() {
    (await this.Aservice.getAllAssessment(this.id.Course_id).subscribe((response:any) => {
      response.filter((item: Assessments) => {
        if(item.Enrolled_Students_id == this.id.Students_id){
          this.assessments += 1;
        }
      })
    }));
  }


  async delete(){
    if(this.assessments > 0){
      (await this.Aservice.deleteAssessmentsByStudent(this.id.id).subscribe({
        next: async data => {
          (await this.deleteEnrolled());

          return;
        },
        error: error => {
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "Some error occurred"
          this.show = false;
          return;
        }
      }));      
    }
    else{
      (await this.deleteEnrolled());
    }
  }

  async deleteEnrolled(){
    (await this.Eservice.deleteEnrolledByStudent(this.id.id).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The student enrollment has been successfully removed!"
        this.show = false;
        return;
      },
      error: error => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred2"
        this.show = false;
        return;
      }
    }));
  }

}
