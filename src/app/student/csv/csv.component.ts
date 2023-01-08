import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { StudentService } from '../../service/student.service'
import { DegreesService } from '../../service/degrees.service'
import { Student } from '../../interface/student.model';

@Component({
  selector: 'app-csv',
  templateUrl: './csv.component.html',
  styleUrls: ['./csv.component.css']
})
export class CsvComponent implements OnInit {
 
  @ViewChild('fileImportInput') fileImportInput: any;
  allDegrees: any = []
  selectedDegree: number = -1;
  registerForm: any = FormGroup;
  submitted = false;
  csvRecords: any;
  message: string
  type: string
  show: boolean = true


  listAllStudents: Student[] = [];
  successInserted: number;
  failedInserted: number;
  failedNoStudent: number;
  failedEmailStudent: number;
  failedSWWrong: number;
  total: number;

  constructor(private Dservice: DegreesService,
              private Sservice: StudentService,
              private formBuilder: FormBuilder,
              private ngxCsvParser: NgxCsvParser) { }

 

  ngOnInit(): void {    
    this.getDegrees();
    this.getAllStudents();
    this.Sservice.Refreshrequired.subscribe(res => { this.getAllStudents();})
   

    this.successInserted = 0;
    this.failedInserted = 0;
    this.failedNoStudent = 0;
    this.failedEmailStudent = 0;
    this.failedSWWrong = 0;
    this.total = 0;

    this.registerForm = this.formBuilder.group({
      fileInput: ['', [Validators.required]],
      Degrees_id: [null, Validators.required],
    });
  }

  onFileChangeFromFile($event:any)
  {
      if ($event.target.files && $event.target.files[0]) {
        let file = $event.target.files[0];
          if(file.type != "application/vnd.ms-excel") {           
            //call validation
            this.registerForm.reset();
            this.registerForm.controls["fileInput"].setValidators([Validators.required]);
            this.registerForm.get('fileInput').updateValueAndValidity();
          }else{
            const files = $event.srcElement.files;
            this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
            .pipe().subscribe({
              next: (result): void => {
                this.csvRecords = result;
              },
              error: (error: NgxCSVParserError): void => {
                this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
                this.message = "The CSV file does not have the correct structure."
                this.show = false
                this.onReset();
                return;
              }
            });
            
          }
      }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  async onSubmit() {    
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      if(!this.csvRecords[0].email || !this.csvRecords[0].name ||
         !this.csvRecords[0].surname || !this.csvRecords[0].nostudent)
      {        
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "The CSV file does not have the correct structure."
        this.show = false
        this.onReset();
        return;
      } 
      (await this.insertStudents());
      
      
      if(this.total == this.csvRecords.length){
        console.log("Length ->"+this.csvRecords.length); 
        console.log("Total ->"+(this.total+1));
        console.log("Fail ->"+this.failedInserted);
        console.log("success ->"+this.successInserted);
        if(this.failedInserted == 0) {
          this.type = 'alert alert-success alert-dismissible fade show';
          this.message = `<b>The student list has been added successfully.</b>
                          <br><br> 
                          <h3><b>Details</b></h3>
                          <ul>
                              <li><b>Total Fail: </b>  ${this.failedInserted}</li>
                              <li><b>Total success: </b>  ${this.successInserted}</li>
                              <li><b>Total length: </b>  ${this.csvRecords.length}</li>
                          </ul>`
          this.show = false
          this.onReset();
          return;
        }
        else if(this.failedInserted > 0 && this.failedInserted < this.csvRecords.length){
          this.type = 'alert alert-warning alert-dismissible fade show';
          this.message = `<b>Some students are already enrolled.</b>
                          <br><br> 
                          <h3><b>Details</b></h3>
                          <ul>
                              <li><b>Total Fail: </b>  ${this.failedInserted}</li>
                              <li><b>Fail by number of student: </b>  ${this.failedNoStudent}</li>
                              <li><b>Fail by email of student: </b>  ${this.failedEmailStudent}</li>
                              <li><b>Total success: </b>  ${this.successInserted}</li>
                              <li><b>Total length: </b>  ${this.csvRecords.length}</li>
                          </ul>`
          this.show = false
          this.onReset();
          return;
        }
        else{
          this.type = 'alert alert-danger alert-dismissible fade show';
          this.message = `<b>It was not possible to enter any of the students.</b>
                          <br><br> 
                          <h3><b>Details</b></h3>
                          <ul>
                              <li><b>Total Fail: </b>  ${this.failedInserted}</li>
                              <li><b>Fail by number of student: </b>  ${this.failedNoStudent}</li>
                              <li><b>Fail by email of student: </b>  ${this.failedEmailStudent}</li>
                              <li><b>Total success: </b>  ${this.successInserted}</li>
                              <li><b>Total length: </b>  ${this.csvRecords.length}</li>
                          </ul>`
          this.show = false
          this.onReset();
          return;
        }
      } 
      
    }  
  }
  async insertStudents(): Promise<any> {
    for(let s of this.csvRecords){
      let find: boolean = false;
      (await this.listAllStudents.filter((item: Student) => {
          if(item.nostudent === s.nostudent){
            find = true;
            this.failedNoStudent += 1;
            return;
          }else if(item.email === s.email){
            find = true;
            this.failedEmailStudent += 1;
            return;
          }
      }))
      if(find != false){
        this.failedInserted += 1;
      }
      else{
        let student: Student = s;
        student.Degrees_id = this.registerForm.value.Degrees_id;
        
        this.successInserted += 1;
        (await this.Sservice.createStudent(student).subscribe({
          next: async data => {
            return;
          }, 
          error: async error => {
            console.log(error);
            return;
          }
        }));
       
      }        
      this.total += 1;
    }
  }

  getDegrees(): void {
    this.Dservice.getAllDegrees().subscribe((response:any) => {
      this.allDegrees = response
    })
  }

  async getAllStudents(): Promise<void> {
    (await this.Sservice.getAllStudent().subscribe((response:any) => { this.listAllStudents = response}))
  }
  
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}
