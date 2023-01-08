import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuotationService } from '../../../../service/quotation.service';
import { Quotation } from '../../../../interface/quotation.model'

import { EvaluationmethodsService } from '../../../../service/evaluationmethods.service';
import { Evaluationmethods } from '../../../../interface/evaluationmethods.model'

@Component({
  selector: 'app-update-eva',
  templateUrl: './update-eva.component.html',
  styleUrls: ['./update-eva.component.css']
})
export class UpdateEvaComponent implements OnInit, OnChanges {

  @Input() id: any;

  quotationForm: FormGroup = new FormGroup({
    EvaluationMethods_id: new FormControl(''),
    percentage: new FormControl('')
  });
  
  listAllEvalutionMethods: Evaluationmethods[] = [];
  listAllQuotation:  Quotation[] = [];

  max: number = 1 

  submitted: boolean = false;
  
  message: string
  type: string
  show: boolean = true

  quotation: any = []

  constructor(private formBuilder: FormBuilder,
              private Qservice: QuotationService,
              private Eservice: EvaluationmethodsService) { }

  ngOnChanges(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true

    if(this.id.Course_id != undefined)
      this.getAllQuotation();
    
    this.quotationForm.patchValue({
      EvaluationMethods_id: this.id.EvaluationMethods_id,
      percentage: this.id.percentage
    })
  }

  ngOnInit(): void {
    this.getAllEvaluationMethods();

    this.quotationForm = this.formBuilder.group({
      EvaluationMethods_id: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(this.max)]]
    });

    this.Qservice.Refreshrequired.subscribe(async res => {
      this.listAllQuotation = [];
      (await this.getAllQuotation());
    })
    
  
  }

  async getAllEvaluationMethods(){
    (await this.Eservice.getAllEvaluationMethod().subscribe(async (result: any) => {
      this.listAllEvalutionMethods = result;     
    }))
  }
  
  async getAllQuotation(){
    (await this.Qservice.getAllQuotation(this.id.Course_id).subscribe(async (result: any) => {
      this.listAllQuotation = result;
      this.max = 1;
      let m = 0;
      (await this.listAllQuotation.filter((item:any) => {
        if(this.id.id != item.id){
          m += item.percentage
        }      
      }));

      if(m > 0){
        this.max = 1-m;
      }
    }))
  }

  get f(): { [key: string]: AbstractControl } {
    return this.quotationForm.controls;
  }

  async onSubmit(){
    this.submitted = true;    
    console.log(this.quotationForm.value)

    if (this.quotationForm.invalid) {
      return;
    }
    let newQuotation: Quotation = this.quotationForm.value
    newQuotation.Course_id = this.id.Course_id; 

    (await this.Qservice.updateQuotation(this.id.id, newQuotation).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The Evaluation Method data has been successfully changed!"
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
