import { Injectable } from '@angular/core';
import { HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Candidat } from '../models/candidat';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class CandidatService {

  baseUrl:String="http://145.14.158.40:8081/users/";
  usersList:Candidat[];
  users:Candidat[]=[];

  constructor(private http:Http) { }

  getAllCandidats(): Observable<Candidat[]> {
      return this.http
          .get(this.baseUrl + 'getAllCandidat').pipe(
            map((response: Response) => {
                let body= <Candidat[]>response.json();
                return body || [];
            })
          )
         
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

modifierEtatCandidat(id, user) {
  var body = JSON.stringify(user);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put(this.baseUrl+"modifEtatCandidat",body,requestOptions);

}
validerPeriodeEssaiCandidat(user) {
  var body = JSON.stringify(user);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put(this.baseUrl+"validerPeriodeEssai",body,requestOptions);

}
}
