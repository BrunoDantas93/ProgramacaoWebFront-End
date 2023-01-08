import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuotationService } from '../../../../service/quotation.service';
import { Quotation } from '../../../../interface/quotation.model'

import { EvaluationmethodsService } from '../../../../service/evaluationmethods.service';
import { Evaluationmethods } from '../../../../interface/evaluationmethods.model'

@Component({
  selector: 'app-add-eva',
  templateUrl: './add-eva.component.html',
  styleUrls: ['./add-eva.component.css']
})
export class AddEvaComponent implements OnInit, OnChanges {

  @Input() id: any;

  quotationForm: FormGroup = new FormGroup({
    EvaluationMethods_id: new FormControl(''),
    percentage: new FormControl('')
  });
  
  listAllEvalutionMethods: Evaluationmethods[] = [];
  listAllQuotation:  Quotation[] = [];

  max: number = 1 

  submitted: boolean = false;
  
  message: string = ""
  type: string = ""
  show: boolean = true

  quotation: any = []
  
  constructor(private formBuilder: FormBuilder,
    private Qservice: QuotationService,
    private Eservice: EvaluationmethodsService) { }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true
  }

  
  ngOnInit(): void {
    
    this.getAllEvaluationMethods();
    
    this.Qservice.Refreshrequired.subscribe(res=>{
      this.max = 1;
      this.listAllQuotation = []
      this.getAllQuotation();   
    });

    this.quotationForm = this.formBuilder.group({
      EvaluationMethods_id: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(this.max)]]
    });

  }

  async getAllEvaluationMethods(){
    (await this.Eservice.getAllEvaluationMethod().subscribe(async (result: any) => {
      this.listAllEvalutionMethods = result;     
    }))
  }
  
  async getAllQuotation(){
    (await this.Qservice.getAllQuotation(this.id).subscribe(async (result: any) => {
      this.listAllQuotation = result;
      let m = 0;
      (await this.listAllQuotation.filter((item:any) => {
        m += item.percentage
      }));

      if(m > 0){
        m = 1-m
        this.max = parseFloat(m.toFixed(2));
      }
    }))
  }

  get f(): { [key: string]: AbstractControl } {
    return this.quotationForm.controls;
  }

  async onSubmit(){
    this.submitted = true;    

    if (this.quotationForm.invalid) {
      return;
    }
    if(this.max == 0)
    { 
      this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
      this.message = "Already have the maximum percentage possible"
      this.show = false;
      this.onReset();
      return;
    }
    else
    {  
      let newQuotation: Quotation = this.quotationForm.value
      newQuotation.Course_id = this.id;
      
      (await this.Qservice.createQuotation(newQuotation).subscribe({
        next: data => {
          this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
          this.message = "The Evaluation Method data has been created successfully!"
          this.show = false;
          this.onReset();
          return;
        },
        error: error => {
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "Some error occurred"
          this.show = false;
          this.onReset();
          return;
        }
      }));
    }
  }

  
  onReset(): void {
    this.submitted = false;
    this.quotationForm.reset();
  }

}
