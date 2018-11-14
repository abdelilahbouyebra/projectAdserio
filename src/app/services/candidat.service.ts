import { Injectable } from '@angular/core';
import { HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Candidat } from '../models/candidat';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class CandidatService {

  baseUrl:String="http://localhost:8081/";
  usersList:Candidat[];
  users:Candidat[]=[];

  constructor(private http:Http) { }

  getAllCandidats(): Observable<Candidat[]> {
      return this.http
          .get(this.baseUrl + 'getAllCandidat')
          .map((response: Response) => {
              let body= <Candidat[]>response.json();
              return body || [];
          })
          .catch(this.handleError);
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

modifierEtatCandidat(id, user) {
  var body = JSON.stringify(user);
  console.log(id)
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put(this.baseUrl+"modifEtatCandidat/" + id,body,requestOptions);

}
}
