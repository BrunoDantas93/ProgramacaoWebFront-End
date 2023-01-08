import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DegreesComponent } from './degrees/degrees.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { CsvComponent } from './student/csv/csv.component';
import { SchoolyearComponent } from './schoolyear/schoolyear.component'
import { CourseComponent } from './course/course.component'
import { DetailsComponent } from './course/details/details.component'
import { EvaluationmethodsComponent } from './evaluationmethods/evaluationmethods.component'


const routes: Routes = [  
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  { path: 'degrees', component: DegreesComponent, canActivate : [AuthGuard]},
  { path: 'students', component: StudentComponent, canActivate : [AuthGuard]},
  { path: 'studentsCsv', component: CsvComponent, canActivate : [AuthGuard]},
  { path: 'schoolyears', component: SchoolyearComponent, canActivate : [AuthGuard]},
  { path: 'courses', component: CourseComponent, canActivate : [AuthGuard]},
  { path: 'courses/:id', component: DetailsComponent, canActivate : [AuthGuard]},
  { path: 'evaluationmethods', component: EvaluationmethodsComponent, canActivate : [AuthGuard]},
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

/*,
    children:[ 
      { path: '/:id', component: DegreesComponent, canActivate:[AuthGuard]}
    ] */

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
