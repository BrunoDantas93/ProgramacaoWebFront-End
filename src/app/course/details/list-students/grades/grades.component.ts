import { Component, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { EvaluationmethodsService } from '../../../../service/evaluationmethods.service';
import { Evaluationmethods } from '../../../../interface/evaluationmethods.model'

import { QuotationService } from '../../../../service/quotation.service';
import { Quotation } from '../../../../interface/quotation.model'

import { EnrolledService } from '../../../../service/enrolled.service';
import { Enrolled } from '../../../../interface/enrolled.model';

import { AssessmentsService } from '../../../../service/assessments.service';
import { Assessments } from '../../../../interface/assessments.model';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit, OnChanges {
  
  @Input() id: any;

  submitted: boolean = false;
  
  message: string
  type: string
  show: boolean = true
  
  update: boolean = false;
  
  listAllEvalutionMethods$: Evaluationmethods[] = [];
  listAllQuotation:  Quotation[] = [];
  listAllAssessments: Assessments[] = [];
  assessment: Assessments;

  assamentsForm: FormGroup = new FormGroup({
    Quotation_id: new FormControl(''),
    Grade: new FormControl('')
  });

  constructor(private formBuilder: FormBuilder,
              private EvaService: EvaluationmethodsService,
              private Qservice: QuotationService,
              private Aservice: AssessmentsService) { }

  ngOnChanges(): void {
    this.submitted = false;
    this.message = "";
    this.type = "";
    this.show = true;

    if(this.id.Course_id != undefined){
      this.getAllQuotation();
      this.getAllAssessment();
    }

    this.Aservice.Refreshrequired.subscribe(() =>{
      this.listAllEvalutionMethods$ = [];
      this.listAllQuotation = [];
      this.getAllQuotation();
      this.getAllAssessment();
      this.onReset();
    });

    this.EvaService.Refreshrequired.subscribe(() =>{
      this.listAllEvalutionMethods$ = [];
      this.listAllQuotation = [];
      this.getAllEvaluationMethods();
      this.getAllQuotation();
      this.getAllAssessment();
      this.onReset();
    });

    this.Qservice.Refreshrequired.subscribe(() =>{
      this.listAllEvalutionMethods$ = [];
      this.listAllQuotation = [];
      this.getAllEvaluationMethods();
      this.getAllQuotation();
      this.getAllAssessment();
      this.onReset();
    });


    $('#basicModalGrades').on('hidden.bs.modal', () => {
      this.onReset();
    })
  }


  ngOnInit(): void {
    this.getAllEvaluationMethods();
    this.assamentsForm = this.formBuilder.group({
      Quotation_id: [null, Validators.required],
      Grade: ['', [Validators.required, Validators.min(0), Validators.max(20)]]
    });
  }
  
  async getAllEvaluationMethods(){
    (await this.EvaService.getAllEvaluationMethod()
      .subscribe((response: any) => {this.listAllEvalutionMethods$ = response;})
      
    );
  }

  getEvaluationMethod(id: any){
    return this.listAllEvalutionMethods$.filter((item:any) => item.id === id)
  }
  
  async getAllQuotation(){
    (await this.Qservice.getAllQuotation(this.id.Course_id)
      .subscribe((response: any) => this.listAllQuotation = response)
    );
  }

  async getAllAssessment(){
    (await this.Aservice.getAllAssessment(this.id.Course_id).subscribe( async (response: any) => {
      this.listAllAssessments = response.filter((item: any) => item.Enrolled_Students_id === this.id.Students_id);
    }))
  }



  get f(): { [key: string]: AbstractControl } {
    return this.assamentsForm.controls;
  }

  async onChange(){
    this.submitted = false;
    this.message = "";
    this.type = "";
    this.show = true;

    this.assamentsForm.patchValue({
      Grade: ''
    })
    
    const value = this.f['Quotation_id'].value;
    this.update = false;
    
    

    (await this.listAllAssessments.filter(async (item: Assessments) => {
      if(item.Quotation_id == value){ 
        this.update = true; 
        this.assessment = item;
        return;
      }
    }));

    if(this.update != false){
      this.assamentsForm.patchValue({
        Grade: this.assessment.Grade
      })
    }

  }

  async onSubmit(){
    this.submitted = true;    

    if (this.assamentsForm.invalid) {
      return;
    }
  
    let assessment: Assessments = this.assamentsForm.value
    if(this.update == true){
      this.assessment.Grade = assessment.Grade;
      (await this.Aservice.updateAssessments(this.assessment.id, this.assessment).subscribe({
        next: data => {
          this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
          this.message = "The Assessment data has been successfully changed!"
          this.show = false
          return;
        },
        error: error => {
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "Some error occurred"
          this.show = false
          return;
        }
      }));
    }else{

      let getEva: any = this.listAllQuotation.filter((item: any) => item.id === assessment.Quotation_id);
      
      assessment.Quotation_EvaluationMethods_id = getEva[0].EvaluationMethods_id
      assessment.Enrolled_id = this.id.id;
      assessment.Enrolled_Course_id = this.id.Course_id;
      assessment.Enrolled_Students_id = this.id.Students_id;
      

      (await this.Aservice.createAssessment(assessment).subscribe({
        next: data => {
          console.log(data);
          this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
          this.message = "The Assessment data has been successfully created!"
          this.show = false
          return;
        },
        error: error => {
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "Some error occurred"
          this.show = false
          return;
        }
      }));
    }

  }

  onReset(): void {
    this.submitted = false;
    this.assamentsForm.reset();
  }
}
