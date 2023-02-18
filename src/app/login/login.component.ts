import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TeachersService } from '../service/teachers.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Validation from '../utils/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitted = false;
  returnUrl: string

  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder, 
              private service: TeachersService, 
              private router : Router,  
              private authService : AuthService  ) { }

  
  ngOnInit(): void {
    this.returnUrl = '/dashboard';  

    if(localStorage.getItem('isLoggedIn') == "true")
      this.router.navigate([this.returnUrl]);

      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ]
    })  
    
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  
  loginSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    
    this.service.loginTeacher(this.loginForm.value).subscribe({
      next: data => {
        console.log(data);
        this.onReset();
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', data.accessToken)
        this.router.navigate([this.returnUrl])

        /*this.onReset();
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', data.id);  
        localStorage.setItem('name', data.name); 
        localStorage.setItem('surname', data.surname); 
        localStorage.setItem('email', data.email);  
        localStorage.setItem('noteacher', data.noteacher);  
        this.router.navigate([this.returnUrl]);*/
      },
      error: error => {
        this.type = 'alert alert-danger alert-dismissible fade show';
        this.message = "The Login data is incorrect."
        this.show = false
        this.onReset();
        return;
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}
