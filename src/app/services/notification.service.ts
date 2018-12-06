import { Injectable } from '@angular/core';
import { HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Candidat } from '../models/candidat';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class NotificationService {

    baseUrl:String="http://localhost:8081/users/";
    users:Candidat[]=[];

  constructor(private http:Http) { }

  getVerifierDateEmbouche(): Observable<Candidat[]> {
   return this.http
          .get(this.baseUrl + 'verifDateValidEmb').pipe(
            map((response: Response) => {
                return  <Candidat[]>response.json();
            })
          )
  }
  countPeriodEssai(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'countPerEssai').pipe(
            map((response: Response) => {
                return  response.json();
            })
        )
       
        
}
countValiditeCarteSejour(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'countValCarteSej').pipe(
            map((response: Response) => {
                return  response.json();
            })
        )

        
}
countDateEntAnnuel(): Observable<any> {
    return this.http
        .get(this.baseUrl + 'dateEntrAnnuel/').pipe(
           map((response: Response) => {
                return  response.json();
            })
        )

        
}
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}


}
