import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Data } from './models/data.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { HttpErrorHandler, HandleError } from '../../_core/config/http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Data {
  "id":	number;
  "author":	string;
  "data": string;
  "tag":  string;
}

export interface Result {
  "id":  number;
  "author":  string;
  "data": string;
  "tag":  string;
}


@Injectable()
export class DataService {
//?date=20180706&actor1=fra&actor2=fra
prediction={}
  private apiUrl="http://ec2-34-251-121-180.eu-west-1.compute.amazonaws.com:5000/predict";
  private apiUrl2 = "http://localhost:3000/mongo/prediction/history";
  private apiUrl3 = "http://localhost:3000/mongo/action";

  data: any = {};

  private handleError: HandleError;

  constructor(
    private _http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DataService');
  }

  getHistory(prediction): Observable<any>{
    console.log(prediction)
    return this._http.post(this.apiUrl2, prediction, httpOptions)
    .pipe(
      catchError(this.handleError<any[]>('history', []))
    );
  }

  getAction(code): Observable<any>{
    return this._http.get(this.apiUrl3+"/"+code)
    .pipe(
      catchError(this.handleError<any[]>('history', []))
    );
  }

  // getPrediction(prediction): Promise<any>{
     getPrediction(predict){
    console.log(predict)
     this.prediction = ({date:"20180705",event:10})
    this.getAction(this.prediction.event).subscribe(res =>
    {

      this.prediction.event=res[0].event;
    })

      console.log(this.prediction)
    return this.prediction;
    
    
    
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



 
