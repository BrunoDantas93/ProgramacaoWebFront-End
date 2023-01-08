import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluationmethodsService } from '../../service/evaluationmethods.service'

@Component({
  selector: 'app-add-em',
  templateUrl: './add-em.component.html',
  styleUrls: ['./add-em.component.css']
})
export class AddEMComponent implements OnInit {

  evaluationMethodForm: FormGroup = new FormGroup({
    label: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: EvaluationmethodsService) { }

  ngOnInit(): void {
    this.evaluationMethodForm = this.formBuilder.group({label: ['', [Validators.required]]})  


    $('#basicModal').on('hidden.bs.modal', () => {
      this.message = ""
      this.show = true
      this.type = ""
    })

  }

  get f(): { [key: string]: AbstractControl } {
    return this.evaluationMethodForm.controls;
  }
  
  onSubmit(): void{
    this.submitted = true;
    if (this.evaluationMethodForm.invalid) {
      return;
    }

    this.service.createEvaluationMethod(this.evaluationMethodForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The student was created successfully"
        this.show = false
        this.onReset();
        return;
      },
      error: data => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred!"
        this.show = false
        this.onReset();
        return;
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.evaluationMethodForm.reset();
  }
  

}
