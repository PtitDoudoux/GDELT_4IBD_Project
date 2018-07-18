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
	noHistory=false;
	noPrediction=false;

	dateName=""

	constructor(private router: Router) {
		
	}
		

	ngOnInit(){

		console.log("RESULT: "+JSON.stringify(this.result))
		 this.noHistory=false
	 this.noPrediction=false

 	this.dateName=this.formatDateString(this.result.formData.date)
		if(!this.isEmpty(this.result["history"])){
    this.result['history'].forEach(item =>{
      item['date_name']=this.formatDateString(item.SQLDATE.toString())
    })
    }
    else {
      this.result['history']=[{}];
      this.noHistory=true;
	}

     if(!this.isEmpty(this.result["predicted"]['prediction'])){
   this.result['predicted']['prediction'].forEach(item =>{
      item['date_name']=this.formatDateString(item.date.toString())
    })
    }
     else {
     	this.result['predicted']['prediction']=[{}];
     	 this.noPrediction=true;
     }



     this.res = this.result;  
console.log("RESULT: "+JSON.stringify(this.res))
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
