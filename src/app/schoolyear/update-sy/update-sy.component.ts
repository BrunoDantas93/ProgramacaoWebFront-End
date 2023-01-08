import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolyearService } from '../../service/schoolyear.service'

@Component({
  selector: 'app-update-sy',
  templateUrl: './update-sy.component.html',
  styleUrls: ['./update-sy.component.css']
})
export class UpdateSYComponent implements OnInit, OnChanges{
  @Input() id: any;
  
  schoolYearUForm: FormGroup = new FormGroup({
    label: new FormControl('')
  });
  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: SchoolyearService) { }


  ngOnChanges(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true

    this.schoolYearUForm.patchValue({
      label: this.id.label
    })
  }

  ngOnInit(): void {
    console.log(this.id)
    this.schoolYearUForm = this.formBuilder.group({
      label: ['', [Validators.required]]})  
  }


  get f(): { [key: string]: AbstractControl } {
    return this.schoolYearUForm.controls;
  }
  
  schoolYearUSubmit(): void {
    this.submitted = true;
    if (this.schoolYearUForm.invalid) {
      return;
    }
    
    this.service.updateSchoolYear(this.id.id, this.schoolYearUForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The school year label was updated successfully"
        this.show = false
        return;
      },
      error: error => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred"
        this.show = false
        return;
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.schoolYearUForm.reset();
  }

}
