import { Component, OnInit, Renderer2 } from '@angular/core';

import { AbstractControl, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../service/teachers.service';
import { Teacher } from '../interface/teacher.model'
import Validation from '../utils/validation';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formChangePassword: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  submitted = false
  returnUrl: string
  id: string | number | null
  surname: string | null;
  name: string | null;
  noteacher: string | null;
  email: string | null;

  teacher: Teacher;

  message: string
  type: string
  show: boolean = true

  sidebarOpen: boolean;

  constructor(private formBuilder: FormBuilder, 
              private service: TeachersService,
              private router: Router,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.returnUrl = '/dashboard';  
    this.type = '';
    this.sidebarOpen = true;
    this.id = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.surname = localStorage.getItem('surname');
    this.email = localStorage.getItem('email');
    this.noteacher = localStorage.getItem('noteacher');

    if(localStorage.getItem('isLoggedIn') != "true")
      this.router.navigate([this.returnUrl]);

    this.formChangePassword = this.formBuilder.group({
      currentPassword: ['', Validators.required],  
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
    return this.formChangePassword.controls;
  }
  
  onSubmit(): void {
    this.submitted = true;
    this.show = true;
    if (this.formChangePassword.invalid) {
      return;
    }

    //Get profile 
    this.service.getTeacher(this.id).subscribe({
      next: data => {
        this.teacher = data
        if(data.password != this.formChangePassword.value.currentPassword) {
          this.type = 'alert alert-danger alert-dismissible fade show';
          this.message = "The Current password is incorrect"
          this.show = false
          this.onReset();
          return;
        }
        
        if(this.teacher.password == this.formChangePassword.value.password){
          this.type = 'alert alert-danger alert-dismissible fade show';
          this.message = "The new password cannot be the same as the old one."
          this.show = false
          this.onReset();
          return;
        }
    
    
        this.teacher.password = this.formChangePassword.value.password;
        this.service.updateTeacher(this.id,this.teacher).subscribe({
          next: data => {
            this.type = 'alert alert-success alert-dismissible fade show';
            this.message = "The password has been changed successfully."
            this.show = false;
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
    this.formChangePassword.reset();
  }
} 
