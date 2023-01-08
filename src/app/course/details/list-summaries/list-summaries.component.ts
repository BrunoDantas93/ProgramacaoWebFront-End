import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SummaryService } from '../../../service/summary.service'
import { Summary } from '../../../interface/summary.model'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-summaries',
  templateUrl: './list-summaries.component.html',
  styleUrls: ['./list-summaries.component.css']
})
export class ListSummariesComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  Course_ID: string | null; 
  listSummaries: Summary[] = [];
  pageSlice: any;
  updateData: any = []
  dataSummary: any = []
  select: string = "-1"
  
  constructor(private route: ActivatedRoute,
              private Suservice: SummaryService) { }

  ngOnInit(): void {    
    this.select = "-1" 
    this.Course_ID = this.route.snapshot.paramMap.get('id');
    this.getAllSummaries();
    this.Suservice.Refreshrequired.subscribe(res=>{
      this.pageSlice = [];
      this.listSummaries = [];
      this.getAllSummaries();   
    });

  }

  private async getAllSummaries() {
    (await this.Suservice.getSummary(this.Course_ID)).subscribe((data: any)=>{
      this.listSummaries = [];
      this.pageSlice = [];
      this.clearSearch();
      this.listSummaries = data;  
      this.pageSlice = this.listSummaries.slice(0, 5)
    })
  }

  setData(data: any): void {
    this.updateData = data
  }
 
  convertDate(inputFormat: Date) {
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
  }

  onPageChange(event: PageEvent) {
    this.pageSlice = []
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.listSummaries.length){
      endIndex = this.listSummaries.length;
    }
    this.pageSlice = this.listSummaries.slice(startIndex, endIndex);
  }

  
  applyDateFilter(event: Event) {
    
    let filterValue: any = ((event.target as HTMLInputElement).value);
    if(filterValue == ""){
      this.clearSearch();
      return;
    }
    filterValue = this.convertDate(filterValue);
    this.pageSlice = this.listSummaries.filter((item: Summary) => {
      console.log(item.date)
      if(this.convertDate(item.date) == filterValue){
        return item;
      }
      return;
    })
    
    
  }

  clearSearch() {
    this.pageSlice = this.listSummaries;
    this.pageSlice = this.listSummaries.slice(0, 5);
    this.paginator.firstPage();
  }
}
