import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as $ from "jquery";

export class Employee{
  constructor(
    public Id: string,
    public EmployeeName:string,
    public StarTimeUtc:string,
    public EndTimeUtc:string,
    public EntryNotes:string,
    public DeletedOn:string,
    public TotalTimeInMonth:number
  ) {
  }
}

export class NewEmployee{
  constructor(
    public Id: number,
    public EmployeeName:string,
    public TotalTimeInMonth:number
  ) {
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'rare-crew-test';

  employees: Employee[]=[];

  newListOfEmployees: NewEmployee[]=[];

  displayedColumns: string[]=['EmployeeName', 'TotalTimeInMonth', 'Actions'];



  private url=`https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ==`;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
   this.getEmployees();

  }

  getEmployees(){
    return this.http.get<any>(this.url).subscribe(
      response=>{
        this.employees=response;

        this.convertList();
      }
    )
  }

  convertList(){
    var i=0;
    var a=0;
    for (var em1 of this.employees){
      let startTime = new Date(em1.StarTimeUtc);
      let endTime = new Date(em1.EndTimeUtc);
      let hours=Math.abs( ((startTime.getHours()*60 + startTime.getMinutes())-(endTime.getHours()*60+endTime.getMinutes()))/60);
      if(em1.EmployeeName==null){
        em1.EmployeeName="Unknown employee";
      }
        for(var em2 of this.newListOfEmployees){
        a=i;
          if(em2.EmployeeName===em1.EmployeeName){
            em2.TotalTimeInMonth+=Math.round(hours);
            a=i+1;
            break;
        }

        }
        if(i==a){
          var em=new NewEmployee(i,em1.EmployeeName,Math.round(hours));
          this.newListOfEmployees.push(em);
          i++;
        }
    }
    this.newListOfEmployees.sort((a,b)=>(a.TotalTimeInMonth>b.TotalTimeInMonth)? -1:1);
    console.log(this.employees);

    console.log(this.newListOfEmployees);
  }


}
