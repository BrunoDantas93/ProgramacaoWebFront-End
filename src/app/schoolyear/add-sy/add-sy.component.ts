import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SchoolyearService } from '../../service/schoolyear.service'

@Component({
  selector: 'app-add-sy',
  templateUrl: './add-sy.component.html',
  styleUrls: ['./add-sy.component.css']
})
export class AddSYComponent implements OnInit {
  schoolyearForm: FormGroup = new FormGroup({
    label: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: SchoolyearService) { }

  ngOnInit(): void {
    this.schoolyearForm = this.formBuilder.group({
      label: ['', [Validators.required]]
    })  
  }

  get f(): { [key: string]: AbstractControl } {
    return this.schoolyearForm.controls;
  }

  onSubmit():void {
    this.submitted = true;
    if (this.schoolyearForm.invalid) {
      return;
    }
    
    this.service.createSchoolYear(this.schoolyearForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The school year label was created successfully"
        this.show = false
        this.onReset();
        console.log(data)
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
    this.schoolyearForm.reset();
  }
}
