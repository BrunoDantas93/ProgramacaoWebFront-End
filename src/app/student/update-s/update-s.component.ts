import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Degrees } from '../../interface/degrees.model';
import { DegreesService } from '../..//service/degrees.service';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-update-s',
  templateUrl: './update-s.component.html',
  styleUrls: ['./update-s.component.css']
})

export class UpdateSComponent implements OnInit, OnChanges {
  @Input() id: any;

  studentForm: FormGroup = new FormGroup({
    nostudent: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    Degrees_id: new FormControl('')
  });

  submitted = false;
  
  message: string
  type: string
  show: boolean = true

  allDegrees: Degrees[] = []

  constructor(private formBuilder: FormBuilder,
              private Sservice: StudentService,
              private service: DegreesService) { }



  ngOnChanges(): void {
    this.submitted = false;
  
    this.message = ""
    this.type = ""
    this.show = true

    this.studentForm.patchValue({
      nostudent: this.id.nostudent,
      name: this.id.name,
      surname: this.id.surname,
      email: this.id.email,
      Degrees_id: this.id.Degrees_id
    })
  }

  ngOnInit(): void {
    this.getAllDegrees();
    this.studentForm = this.formBuilder.group({
      name: ['', Validators.required],      
      nostudent: ['', Validators.required],
      surname: ['',  Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Degrees_id: [null, Validators.required],
    })     
    
  } 
  
  getAllDegrees():void{
    this.service.getAllDegrees().subscribe((response:any) => {
      this.allDegrees = response
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.studentForm.controls;
  }

  onSubmit(){
    this.submitted = true;    
    if (this.studentForm.invalid) {
      return;
    }

    this.Sservice.tstEmailStudent(this.studentForm.value).subscribe({
      next: data => {
        if(data.id != this.id.id){
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "This email is already registered"
          this.show = false
          this.onReset();
          return;
        }
      }
    });

    this.Sservice.tstNoStudent(this.studentForm.value).subscribe({
      next: data => {
        if(data.id != this.id.id){
          this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
          this.message = "This student identifier is already registered"
          this.show = false
          this.onReset();
          return;
        }        
      }
    });

    this.Sservice.updateStudent(this.id.id, this.studentForm.value).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The student was created successfully"
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
    this.studentForm.reset();
  }
}
