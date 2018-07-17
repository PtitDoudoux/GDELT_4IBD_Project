import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from './models/data.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpErrorHandler, HandleError } from '../../_core/config/http-error-handler.service';
import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};


export interface Result {
  "actor1":  number;
  "actor2":  string;
  "prediction": string;
}


@Injectable()
export class DataService {

  private apiUrl="http://ec2-34-251-121-180.eu-west-1.compute.amazonaws.com:5000/predict";
  private apiUrl2 = "http://localhost:3000/mongo/prediction/history";
  private apiUrl3 = "http://localhost:3000/mongo/action";
  private apiUrl4 = "http://localhost:3000/mongo/actors1/all";
  private apiUrl5 = "http://localhost:3000/mongo/actors2/all";
  private apiUrl6 = "http://localhost:3000/mongo/actors/all";

  data: any;
  actorCode: any;
  found:any;
  actors:any;
  names:any;
  prediction=[];


  private handleError: HandleError;

  constructor(
    private _http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DataService');
  }

  // getHistory(prediction): Observable<any>{
  //   return this._http.post(this.apiUrl2, prediction, httpOptions)
  //   .pipe(
  //     catchError(this.handleError<any[]>('history', []))
  //   );
  // }

  getHistory(prediction){
    return new Promise((resolve, reject) => {
      this._http.post(this.apiUrl2, prediction, httpOptions)
        .subscribe(
         data => {
          resolve(data)
        },
         error => {
          reject(error);
        },
);
    });
  }

  getAction(code): Observable<any>{
    return this._http.get(this.apiUrl3+"/"+code)
    .pipe(
      catchError(this.handleError<any[]>('history', []))
    );
  }

   getActors1(){
    return new Promise((resolve, reject) => {
      this._http.get(this.apiUrl4)
        .subscribe(
         data => {
          resolve(data)
        },
         error => {
          reject(error);
        },
);
    });
  }


  getActors2(){
    return new Promise((resolve, reject) => {
      this._http.get(this.apiUrl5)
        .subscribe(
         data => {

          resolve(data)
        },
         error => {
          reject(error);
        },
);
    });
  }

  getActorCode(){
    return new Promise((resolve, reject) => {
      this._http.get(this.apiUrl6)
        .subscribe(
         data => {
          resolve(data)
        },
         error => {
          reject(error);
        },
);
    });
  }

  // getPrediction(prediction): Promise<any>{
     getPrediction(predict){

     this.prediction= [{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"},{date:"20180715",event:"010"}]
     
     this.prediction.forEach(item => {
        this.getAction(item.event).subscribe(res =>
      {
        console.log(res)
        item["action"]=res.Action;
      })
     })
     var obj = { actor1:predict.actor1, actor2:predict.actor2, prediction:this.prediction}

     console.log("OBJJ: "+JSON.stringify(obj))

     return obj;
    
    // return this._http.get(this.apiUrl, {
    //   params: {
    //     date :  prediction.date,
    //     actor1: prediction.actor1,
    //     actor2: prediction.actor2
    //   },
    //   observe: 'response'
    // })
    // .toPromise()
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(console.log);
  }



}



 
