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
import * as moment from 'moment';

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
    
   // console.log(this.datas)
    this.dataCtrlActors = new FormControl();
    this.filteredDatasActors  = this.dataCtrlActors.valueChanges
    .pipe(
      startWith(''),
      map(data => data ? this.filterData(data, this.datas) : this.datas.slice())
      );

    this.dataCtrlActors2 = new FormControl();
    this.filteredDatasActors2  = this.dataCtrlActors2.valueChanges
    .pipe(
      startWith(''),
      map(data => data ? this.filterData(data, this.datas) : this.datas.slice())
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
       console.log(this.model.date)
     this.model.date=this.formatDate(this.picker_date);

     if(typeof(this.model)!='undefined'){
     	// console.log(this.model);
      console.log(this.model)
      var actor1 = this.model.actor1
      var actor2 = this.model.actor2
      var tmp1 = this.datas.find(function(element) {
        if(element.Code == actor1)
        return element.Nom;
      });
      var tmp2 = this.datas.find(function(element) {
        if(element.Code == actor2)
        return element.Nom;
      });

      var toSend = {"actor1":tmp1.Nom,"actor2":tmp2.Nom, "date":this.model.date}

      console.log(this.model.date)

      this.result = {"formData":toSend,
                    "predicted":this.dataService.getPrediction(this.model),
                    "history":{}}

      var a = moment(this.model.date, "YYYYMMDD");
      a.format("MMM Do YYYY");
      console.log(a)
      // then use any of moment's manipulation or display functionality
      this.dataService.getHistory(this.model).subscribe(res =>
      {
        console.log("RESULT: "+res)
        res ? this.result["history"] = res :  this.messageEvent.emit(this.result)
        if(res!=null)
        this.dataService.getAction(this.result["history"]["EventCode"]).subscribe(res =>{
            this.result["history"]["EventCode"]=res[0].event;
        this.messageEvent.emit(this.result);
        });
     });
      }
     
    }
}
  

  saveDate(event: MatDatepickerInputEvent<Date>) {
    this.picker_date = new Date(event.value);
  }


  reset_search(){
    this.model = new Data(null,null,null);

  }

  formatDate(date){
    return ""+date.getFullYear()+(date.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+date.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
  }



  filterData(name: string, datas: any) {
    return datas.filter(data =>
      data.Nom.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }
}
