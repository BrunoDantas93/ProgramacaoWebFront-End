import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../service/teachers.service';
import Validation from '../utils/validation';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    noteacher: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submitted = false;
  returnUrl: string

  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder, 
              private service: TeachersService,
              private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = '/dashboard';  
    this.type = ''
    if(localStorage.getItem('isLoggedIn') == "true")
      this.router.navigate([this.returnUrl]);

    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        noteacher: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required]
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    })     
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    this.service.tstemail(this.form.value).subscribe({
      next: data => {
        this.type = 'alert alert-danger alert-dismissible fade show';
        this.message = "This email is already registered"
        this.show = false
        this.onReset();
        return;
      }
    });
    
    this.service.createTeacher(this.form.value).subscribe({
      next: data => {
        this.type = 'alert alert-success alert-dismissible fade show';
        this.message = "The account was created successfully"
        this.show = false
        this.onReset();
        return;
      },
      error: error => {
        this.type = 'alert alert-danger alert-dismissible fade show';
        this.message = "Some error occurred"
        this.show = false
        this.onReset();
        return;
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}