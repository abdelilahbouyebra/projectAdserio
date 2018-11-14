import { Injectable } from '@angular/core';
import { HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Candidat } from '../models/candidat';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class NotificationService {

  baseUrl:String="http://localhost:8081/";
  users:Candidat[]=[];

  constructor(private http:Http) { }

  getVerifierDateEmbouche(): Observable<Candidat[]> {
      return this.http
          .get(this.baseUrl + 'verifDateValidEmb')
          .map((response: Response) => {
              return  <Candidat[]>response.json();
          })
          .catch(this.handleError);
          
  }
  countPeriodEssai(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'countPerEssai')
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
        
}
countValiditeCarteSejour(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'countValCarteSej')
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
        
}
countDateEntAnnuel(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'dateEntrAnnuel')
        .map((response: Response) => {
            return  response.json();
        })
        .catch(this.handleError);
        
}
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}


}
