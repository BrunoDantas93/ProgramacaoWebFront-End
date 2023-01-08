import { Component, Input, OnInit } from '@angular/core';

import { SummaryService } from '../../../../service/summary.service';

@Component({
  selector: 'app-delete-summary',
  templateUrl: './delete-summary.component.html',
  styleUrls: ['./delete-summary.component.css']
})
export class DeleteSummaryComponent implements OnInit {
  @Input() id: any;
  
  message: string
  type: string
  show: boolean = true

  constructor(private service: SummaryService) { }

  ngOnInit(): void {
    this.message = ""
    this.type = ""
    this.show = true;
  }
  
  onClick(id:any){
    this.service.deleteSummary(id.id).subscribe({
      next: data => {
        this.type = 'alert alert-success bg-success text-light border-0 alert-dismissible fade show';
        this.message = "The summary was been deleted successfully"
        this.show = false
        return;
      },
      error: error => {
        this.type = 'alert alert-danger bg-danger text-light border-0 alert-dismissible fade show';
        this.message = "Some error occurred"
        this.show = false
        return;
      }
    }) 
  }

  convertDate(inputFormat: Date) {
    function pad(s:any) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
  }
}
