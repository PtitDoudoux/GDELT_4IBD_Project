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
    this.currentPossibilities = [];
    

    this.currentPossibilities = [{
      tags: [{
        name: '#BalanceTonPorc',
        type: 'tag'
      },
      {
        name: '#BlackFace',
        type: 'tag'
      },
      {
        name: '#Trump',
        type: 'tag'
      },
      {
        name: '#GreveSncf',
        type: 'tag'
      }],  
      names: [{
        name: 'Arkansas',
        type: 'name'
      },
      {
        name: 'California',
        type: 'name'
      },
      {
        name: 'Florida',
        type: 'name'
      },
      {
        name: 'Texas',
        type: 'name'
      }],  
      actors: [{
        name: 'Macron',
        type: 'actor'
      },
      {
        name: 'France',
        type: 'actor'
      },
      {
        name: 'Plane',
        type: 'actor'
      },
      {
        name: 'Hacker',
        type: 'actor'
      }]
    }];
  }
  

  
    // this._service.getPrediction().subscribe((item) => {

    //   if(item!=null){
    //     // this.found = true;
    //   }
    // });

     //   this.dataService.getPrediction().subscribe( (res) => {
  //     this.possibilities = res[0];

  //     // Ajout des prediction existante à la liste de recherche
  //     res[0].data.map(data => 
  //       this.possibilities.push( Object.assign(data, {"searchfield" : {"tag":res.tag, "name":res.name; "actor":res.actor}})));
  // });
  

  public setTitle( newTitle: string) {
    this.title.setTitle( newTitle );
  }

}
