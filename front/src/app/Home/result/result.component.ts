import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

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
console.log(res)
   res.history.SQLDATE ? this.dates=res.history.SQLDATE.toString().substring(0,4) : this.dates = "YYYYMMDD"

   res.predicted.date ? this.date=this.result.predicted.date.substring(0,4) :this.date = "YYYYMMDD"

	
	console.log(this.dates)
	console.log(this.date)
}
	back(){
		location.reload();
	}

}
