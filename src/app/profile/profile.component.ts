import { Component, OnInit } from '@angular/core';

import { AbstractControl, FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TeachersService } from '../service/teachers.service';
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
  id: string | null

  message: string
  type: string
  show: boolean = true

  constructor(private formBuilder: FormBuilder, 
              private service: TeachersService,
              private router: Router) { }

  ngOnInit(): void {
    this.returnUrl = '/dashboard';  
    this.type = ''
    this.id = localStorage.getItem('token');

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
    if (this.formChangePassword.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.formChangePassword.reset();
  }
} 
