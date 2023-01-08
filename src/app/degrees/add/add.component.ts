import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DegreesService } from '../../service/degrees.service'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  degreeForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: DegreesService) { }

  ngOnInit(): void {
    this.degreeForm = this.formBuilder.group({
      name: ['', [Validators.required]]})  
  }


  get f(): { [key: string]: AbstractControl } {
    return this.degreeForm.controls;
  }
 
  degreeSubmit(): void{
    this.submitted = true;
    if (this.degreeForm.invalid) {
      return;
    }

    this.service.createDegree(this.degreeForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The account was created successfully"
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
    this.degreeForm.reset();
  }
}
