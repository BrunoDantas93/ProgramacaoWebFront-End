import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Summary } from '../../../../interface/summary.model';
import { SummaryService } from '../../../../service/summary.service';

@Component({
  selector: 'app-add-summary',
  templateUrl: './add-summary.component.html',
  styleUrls: ['./add-summary.component.css']
})
export class AddSummaryComponent implements OnInit {
  
  @Input() id: any;
  
  summaryForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    date: new FormControl(''),
    description: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: SummaryService) { }

  ngOnInit(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true;
    
    this.summaryForm = this.formBuilder.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required]
    })  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.summaryForm.controls;
  }

  onSubmit(){
    this.submitted = true;    
    if (this.summaryForm.invalid) {
      return;
    }
    
    let summary: Summary = this.summaryForm.value
    summary.Course_id = this.id

    this.service.createSummary(summary).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The summary was been created successfully"
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
    this.summaryForm.reset();
  }
}
