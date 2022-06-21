import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

export class Employee{
  constructor(
    public Id: string,
    public EmployeeName:string,
    public StarTimeUtc:string,
    public EndTimeUtc:string,
    public EntryNotes:string,
    public DeletedOn:string
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
console.log("usao");
var i=0;
    var a=0;
    console.log(i);
    for (var em1 of this.employees){
      if(this.newListOfEmployees.length>0){
        for(var em2 of this.newListOfEmployees){
        a=i;
          if(em2.EmployeeName===em1.EmployeeName){
          let startTime= new Date(em1.StarTimeUtc);
          let endTime= new Date(em1.EndTimeUtc);
          let hours=Math.abs( ((startTime.getHours()*60 + startTime.getMinutes())-(endTime.getHours()*60+endTime.getMinutes()))/60);
          em2.TotalTimeInMonth+=hours;

          a=i+1;
          break;
        }

        }
        if(i==a){
          let startTime2= new Date(em1.StarTimeUtc);
          let endTime2= new Date(em1.EndTimeUtc);
          let hours=Math.abs( ((startTime2.getHours()*60 + startTime2.getMinutes())-(endTime2.getHours()*60+endTime2.getMinutes()))/60);

          let em=new NewEmployee(i,em1.EmployeeName,hours);
          this.newListOfEmployees.push(em);
          i++;
        }


      }
      else{
        let startTime= new Date(em1.StarTimeUtc);
        let endTime= new Date(em1.EndTimeUtc);
        let hours=Math.abs( ((startTime.getHours()*60 + startTime.getMinutes())-(endTime.getHours()*60+endTime.getMinutes()))/60);
        console.log(hours);
        let em=new NewEmployee(i,em1.EmployeeName,hours);
        this.newListOfEmployees.push(em);
        console.log(this.newListOfEmployees);
        i++;
      }


    }
    console.log(this.employees);

  }
}
