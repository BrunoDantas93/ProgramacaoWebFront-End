import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EvaluationmethodsService } from '../../service/evaluationmethods.service';

@Component({
  selector: 'app-update-em',
  templateUrl: './update-em.component.html',
  styleUrls: ['./update-em.component.css']
})
export class UpdateEMComponent implements OnInit, OnChanges{
  @Input() id: any;

  evaluationMethodForm: FormGroup = new FormGroup({
    label: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true
  constructor(private formBuilder: FormBuilder,
              private service: EvaluationmethodsService) { }
  
  ngOnChanges(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true

    this.evaluationMethodForm.patchValue({
      label: this.id.label
    })
  }
            


  ngOnInit(): void {
    this.evaluationMethodForm = this.formBuilder.group({label: ['', Validators.required]});

    $('#basicModalU').on('hidden.bs.modal', () => {
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

    this.service.updateEvaluationMethod(this.id.id, this.evaluationMethodForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The Evaluation Method was updated successfully"
        this.show = false
        return;
      },
      error: data => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred!"
        this.show = false
        return;
      }
    });
  }
}
