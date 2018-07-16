import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit{

	@Input() result : any;
	dates : string;
	date:string;

	constructor(private router: Router) {}
		

	ngOnInit(){
		var res = this.result
		console.log("REEES : "+this.result)

   res.history.SQLDATE ? this.dates=this.formatDate(res.history.SQLDATE.toString()) : this.dates = ""

   res.predicted.date ? this.date=this.formatDate(res.formData.date) : this.date = ""
}
	back(){
		location.reload();
	}

	formatDate(date)
	{
	  var a = moment(date, "YYYYMMDD");
      a.format("MMM Do YYYY");
      return a["_d"].toString().substr(0, 11)
	}
}
