import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DegreesService } from '../../service/degrees.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnChanges{
  @Input() id: any;
  
  degreeUForm: FormGroup = new FormGroup({
    name: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder,
              private service: DegreesService) { }
  



  ngOnChanges(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true

    this.degreeUForm.patchValue({
      name: this.id.name
    })
  }

  ngOnInit(): void {
    

    $('#basicModalU').on('hidden.bs.modal', () => {
      this.message = ""
      this.show = true
      this.type = ""
    })
    this.degreeUForm = this.formBuilder.group({
      name: ['', [Validators.required]]})  
  }


  get f(): { [key: string]: AbstractControl } {
    return this.degreeUForm.controls;
  }
  
  degreeUSubmit(): void {
    this.submitted = true;
    if (this.degreeUForm.invalid) {
      return;
    }

    this.service.updateDegree(this.id.id, this.degreeUForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The account was created successfully"
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
    this.degreeUForm.reset();
  }

}
