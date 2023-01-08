import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

//ADD
import { HttpClientModule } from '@angular/common/http';

import {DataTablesModule} from 'angular-datatables'; //Por remover
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 

import { TeachersService } from './service/teachers.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DegreesComponent } from './degrees/degrees.component';
import { AddComponent } from './degrees/add/add.component';
import { UpdateComponent } from './degrees/update/update.component';
import { StudentComponent } from './student/student.component';
import { AddSComponent } from './student/add-s/add-s.component';
import { UpdateSComponent } from './student/update-s/update-s.component';
import { CsvComponent } from './student/csv/csv.component';
import { SchoolyearComponent } from './schoolyear/schoolyear.component';
import { AddSYComponent } from './schoolyear/add-sy/add-sy.component';
import { UpdateSYComponent } from './schoolyear/update-sy/update-sy.component';
import { CourseComponent } from './course/course.component';
import { AddCComponent } from './course/add-c/add-c.component';
import { UpdateCComponent } from './course/update-c/update-c.component';
import { DetailsComponent } from './course/details/details.component';
import { AddSummaryComponent } from './course/details/list-summaries/add-summary/add-summary.component';
import { UpdateSummaryComponent } from './course/details/list-summaries/update-summary/update-summary.component';
import { DeleteSummaryComponent } from './course/details/list-summaries/delete-summary/delete-summary.component';
import { EvaluationmethodsComponent } from './evaluationmethods/evaluationmethods.component';
import { AddEMComponent } from './evaluationmethods/add-em/add-em.component';
import { UpdateEMComponent } from './evaluationmethods/update-em/update-em.component';
import { ListStudentsComponent } from './course/details/list-students/list-students.component';
import { GradesComponent } from './course/details/list-students/grades/grades.component';
import { EnrollComponent } from './course/details/list-students/enroll/enroll.component';
import { EvaluionsComponent } from './course/details/evaluions/evaluions.component';
import { UpdateEvaComponent } from './course/details/evaluions/update-eva/update-eva.component';
import { AddEvaComponent } from './course/details/evaluions/add-eva/add-eva.component';
import { DeleteevaComponent } from './course/details/evaluions/deleteeva/deleteeva.component';
import { RemoveStudentComponent } from './course/details/list-students/remove-student/remove-student.component';
import { ListSummariesComponent } from './course/details/list-summaries/list-summaries.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    PageNotFoundComponent,
    ProfileComponent,
    NavbarComponent,
    DegreesComponent,
    AddComponent,
    UpdateComponent,
    StudentComponent,
    AddSComponent,
    UpdateSComponent,
    CsvComponent,
    SchoolyearComponent,
    AddSYComponent,
    UpdateSYComponent,
    CourseComponent,
    AddCComponent,
    UpdateCComponent,
    DetailsComponent,
    AddSummaryComponent,
    UpdateSummaryComponent,
    DeleteSummaryComponent,
    EvaluationmethodsComponent,
    AddEMComponent,
    UpdateEMComponent,
    ListStudentsComponent,
    GradesComponent,
    EnrollComponent,
    EvaluionsComponent,
    UpdateEvaComponent,
    AddEvaComponent,
    DeleteevaComponent,
    RemoveStudentComponent,
    ListSummariesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    MatTableModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [AuthGuard, TeachersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
