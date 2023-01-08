import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { QuotationService } from '../../../service/quotation.service';
import { Quotation } from '../../../interface/quotation.model'

import { EvaluationmethodsService } from '../../../service/evaluationmethods.service';
import { Evaluationmethods } from '../../../interface/evaluationmethods.model'

@Component({
  selector: 'app-evaluions',
  templateUrl: './evaluions.component.html',
  styleUrls: ['./evaluions.component.css']
})
export class EvaluionsComponent implements OnInit {
   
  displayedColumns: string[] = ['id', 'EvaluationMethods', 'percentage', 'actions'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Course_ID: string | null

  listAllQuotation: any[] = [];
  listAllEvalutionMethods: Evaluationmethods[] = [];
  updateData: any = []
  total: number = 0
  btnStatus: Boolean;

  constructor(private route: ActivatedRoute,
              private Qservice: QuotationService,
              private Eservice: EvaluationmethodsService) { }

  async ngOnChanges(): Promise<void>{
    (await this.getAllQuotation());
  }
  
  async ngOnInit(): Promise<void> {
    this.Course_ID = this.route.snapshot.paramMap.get('id');
    this.getAllEvaluationMethods();

    (await this.getAllQuotation());
    this.btnStatus = (await this.isBtnDisabled());

    this.Qservice.Refreshrequired.subscribe(async res=>{
      this.listAllQuotation = [];
      this.dataSource.data= [];
      (await this.getAllQuotation());
    });

  }

  async getAllEvaluationMethods(){
    (await this.Eservice.getAllEvaluationMethod().subscribe((result: any) => {
      this.listAllEvalutionMethods = result;
    }))
  }
  

  async getAllQuotation() {
    (await this.Qservice.getAllQuotation(this.Course_ID).subscribe(
      async (response:any) => {
        this.listAllQuotation = response;
        this.total = 0;
        (await this.listAllQuotation.filter(async (item:any) => {
          this.total += item.percentage
          let a: any  = this.getEvaluationMethod(item.EvaluationMethods_id)
          item.EvaluationMethods = a[0].label;
        }))
        this.btnStatus = (await this.isBtnDisabled())
        /* if(this.total == 1){
          this.btnStatus = true;
        }
        else{
          this.btnStatus = false;
        } */
        this.dataSource.data = this.listAllQuotation;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 
      async (err:any) => {
        this.total = 0;
        this.btnStatus = false;
      }));
   }

   getEvaluationMethod(EvaluationMethods_id: any){
      return this.listAllEvalutionMethods.filter((item:any) => item.id === EvaluationMethods_id);
   }

   setData(data: any): void {
    this.updateData = data
  }
  
   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isBtnDisabled(): boolean {
    if(this.total == 1){
      return true
    }
    return false
  }
}
