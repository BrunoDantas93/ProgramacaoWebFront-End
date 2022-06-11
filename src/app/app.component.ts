import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front-End';
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn') == "true")  
      this.isLoggedIn = true;
  }


}
