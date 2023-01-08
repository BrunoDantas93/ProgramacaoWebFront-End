import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { AssessmentsService } from '../../../../service/assessments.service';
import { Assessments } from '../../../../interface/assessments.model';

import { QuotationService } from '../../../../service/quotation.service';
import { Quotation } from '../../../../interface/quotation.model'

@Component({
  selector: 'app-deleteeva',
  templateUrl: './deleteeva.component.html',
  styleUrls: ['./deleteeva.component.css']
})
export class DeleteevaComponent implements OnInit, OnChanges {
  
  @Input() id: any;
    
  message: string
  type: string
  show: boolean = true
  assessments: number = 0;

  constructor(private Aservice: AssessmentsService,
              private Qservice: QuotationService) { }

  ngOnChanges(): void {
    this.message = ""
    this.type = ""
    this.show = true
    this.assessments = 0
    if(this.id.Course_id != undefined){
      this.getAssessments();
    }
  }

  ngOnInit(): void {
    this.message = ""
    this.type = ""
    this.show = true
    this.assessments = 0
  }

  async getAssessments() {
    (await this.Aservice.getAllAssessment(this.id.Course_id).subscribe((response:any) => {
      response.filter((item: Assessments) => {
        if(item.Quotation_id == this.id.id){
          this.assessments += 1;
        }
      })
      console.log(this.assessments)
    }));
  }

  async delete(){    
    if(this.assessments > 0){
      (await this.Aservice.deleteAssessments(this.id.id).subscribe({
        next: async data => {
          (await this.deleteQuotation());
          
          console.log(data)
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
      (await this.deleteQuotation());
    }
  }
  
  async deleteQuotation(){
    (await this.Qservice.deleteQuotation(this.id.id).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The Evaluation Method has been deleted successfully!"
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
