import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  sidebarOpen: boolean;  
  id: string | null; 
  fullName: string | null;
  name: string | null;
  noteacher: string | null;
  email: string | null;

  constructor(private router: Router, 
              private authService: AuthService,
              private renderer: Renderer2) { }  

  ngOnInit(): void {
    this.id = localStorage.getItem('token');
    this.name = localStorage.getItem('name');
    this.fullName = localStorage.getItem('name')+" "+localStorage.getItem('surname');
    this.email = localStorage.getItem('email');
    this.noteacher = localStorage.getItem('noteacher');
  }

  onClick(): void{
    if(this.sidebarOpen == true){
      this.renderer.addClass(document.body,'toggle-sidebar')
      this.sidebarOpen = false
    }
    else{
      this.renderer.removeClass(document.body,'toggle-sidebar')
      this.sidebarOpen = true
    }
   } 

  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }
}
