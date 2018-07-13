import { Component, OnInit} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DataService } from '../_shared/services/data.service';
import {Data} from '../_shared/services/models/data.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService]
})
export class HomeComponent implements OnInit{

  error: string;
  currentPossibilities: any;
  found: any;


  constructor(private title : Title, private _service : DataService) {
    this.setTitle("Guess It")
    this.found = false;
  }

  ngOnInit() {
    this.found = false;
    this.getAutocomplete();
  }

 submitted($event) {
    this.found = $event;
  }

  getAutocomplete(){
 this._service.getActors().then(res => {
      this.currentPossibilities = res;
  })
  }


  

  public setTitle( newTitle: string) {
    this.title.setTitle( newTitle );
  }

}
