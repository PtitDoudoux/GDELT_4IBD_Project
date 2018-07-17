import { Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
	selector: 'app-result',
	templateUrl: './result.componentdynamic.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{

	@Input() result : any;
	dates : string;
	date:string;
	res ={};
	objectKeys = Object.keys;
	history =[];

	constructor(private router: Router) {
		
	}
		

	ngOnInit(){
console.log("REES : "+this.result)
		this.res = this.result;
		
		// if(!this.isEmpty(this.res["history"])){
  //   this.res['history'].forEach(item =>{
  //     item['date_name']=this.formatDateString(item.SQLDATE.toString())
  //   })
  //   }
  //   else 
  //     this.res['history']=[]

  //    if(!this.isEmpty(this.res["predicted"])){
  //   this.res['predicted']['prediction'].forEach(item =>{
  //     item['date_name']=this.formatDateString(item.date.toString())
  //   })
  //   }

}
  formatDateString(date)
  {
    var a = moment(date, "YYYYMMDD");
      a.format("MMM Do YYYY");
      return a["_d"].toString().substr(0, 11)
  }
	isEmpty(obj) {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

	back(){
		location.reload();
	}
}
