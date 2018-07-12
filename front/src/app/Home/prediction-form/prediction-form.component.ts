import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { FormControl} from '@angular/forms';
import { DataService } from '../../_shared/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {Data} from '../../_shared/services/models/data.model';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-prediction-form',
  templateUrl: './prediction-form.component.html',
  styleUrls: ['./prediction-form.component.scss']
})
export class PredictionFormComponent implements OnInit {
  startDate = new Date(1990, 0, 1);
  minDate = new Date(2000, 0, 1);

  picker_date: any;
  data: Data[];
  result ={}


  // dataCtrlTags: FormControl;
  dataCtrlActors: FormControl;
    dataCtrlActors2: FormControl;
  // filteredDatasTags: Observable<any[]>;
  filteredDatasActors: Observable<any[]>;
  filteredDatasActors2: Observable<any[]>;

  submitted : any;

  @Input() datas : any;
  @Output() messageEvent = new EventEmitter();

  constructor(private router: Router, private dataService : DataService) { }

  model = new Data(null,null,null);

 

  /*newPredict() {
    this.model = new Data("test","test","test", "test");
  }*/

  ngOnInit() {
    this.startDate = new Date();
    this.minDate = new Date();
    
    this.dataCtrlActors = new FormControl();
    this.filteredDatasActors  = this.dataCtrlActors.valueChanges
    .pipe(
      startWith(''),
      map(data => data ? this.filterData(data, this.datas[0].actors) : this.datas[0].actors.slice())
      );

    this.dataCtrlActors2 = new FormControl();
    this.filteredDatasActors2  = this.dataCtrlActors2.valueChanges
    .pipe(
      startWith(''),
      map(data => data ? this.filterData(data, this.datas[0].actors) : this.datas[0].actors.slice())
      );

    // this.dataCtrlTags = new FormControl();
    // this.filteredDatasTags = this.dataCtrlTags.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(data => data ? this.filterData(data, this.datas[0].tags) : this.datas[0].tags.slice())
    //   );
   }

   search(){
  	this.submitted = true;
    if(this.picker_date){
     this.model.date=this.formatDate();
     if(typeof(this.model)!='undefined'){
     	// console.log(this.model);

      this.result = {"formData":this.model,
                    "predicted":this.dataService.getPrediction(this.model),
                    "history":null}

      this.dataService.getHistory(this.model).subscribe(res =>
      {
        this.result.history = res
        this.dataService.getAction(this.result.history.EventCode).subscribe(res =>{
            this.result.history.EventCode=res[0].event;
      console.log(this.result)
        this.messageEvent.emit(this.result);
      
        })
      })

      
      
     

      // console.log(obje)
    //   this.messageEvent.emit(this.history);
    //   this.getAction(this.prediction.event).subscribe(res =>
    // {
    //   this.prediction.event=res[0].event;
    // })
      
    

      // this.messageEvent.emit(result);

  // 	this.dataService.getPrediction(this.model).then(
  //      res => { 
  //      	console.log(res)
	 //    //    for (var prop in res) {
	 //  		// 	console.log(prop);
	 //  		// }
  // 		},
  //      err => console.log(err)
  //      // () => console.log('Complete!')
  // );
  // 	}
       // this.messageEvent.emit(this.model);
  } 
    }
}
  

  saveDate(event: MatDatepickerInputEvent<Date>) {
    this.picker_date = new Date(event.value);
  }


  reset_search(){
    this.model = new Data(null,null,null);

  }

  formatDate(){
    return ""+this.picker_date.getFullYear()+(this.picker_date.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+this.picker_date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }

  filterData(name: string, datas: any) {
    return datas.filter(data =>
      data.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
