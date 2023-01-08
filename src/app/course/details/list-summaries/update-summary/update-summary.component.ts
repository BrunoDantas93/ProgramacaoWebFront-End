import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Summary } from '../../../../interface/summary.model';
import { SummaryService } from '../../../../service/summary.service';
@Component({
  selector: 'app-update-summary',
  templateUrl: './update-summary.component.html',
  styleUrls: ['./update-summary.component.css']
})
export class UpdateSummaryComponent implements OnInit, OnChanges{

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
  

 
async ngOnChanges(): Promise<void> {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true;
    (await this.convertDate(this.id.date));
    this.summaryForm.patchValue({
      title: this.id.title,
      date: this.id.date,
      description: this.id.description
    })
  }

  async ngOnInit(): Promise<void> {
    (await this.convertDate(this.id.date));
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
    summary.Course_id = this.id.Course_id
    
    this.service.updateSummary(this.id.id, summary).subscribe({
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
  
  convertDate(inputFormat: Date) {
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    this.id.date = [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
  }

  onReset(): void {
    this.submitted = false;
    this.summaryForm.reset();
  }

}
