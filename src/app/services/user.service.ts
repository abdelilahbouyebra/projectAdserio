import { Injectable } from '@angular/core';
import { HttpHeaders,HttpErrorResponse,HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Candidat } from '../models/candidat';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { DatePipe } from '@angular/common';


@Injectable()
export class UserService {

  baseUrl:String="http://localhost:8081/users/";
  usersList:Candidat[];
  users:Candidat[]=[];

  constructor(private http:Http) { }

  getAllCandidats(): Observable<Candidat[]> {
      return this.http
          .get(this.baseUrl + 'getAllCandidat').pipe(
            map((response: Response) => {
              return <Candidat[]>response.json();
          })
          )
  }
  private handleError(error: Response) {
    return Observable.throw(error.statusText);
}
  candidats(){
    return this.http.get(this.baseUrl+'getAllCandidat');
  }
/** add condidat */
 addCandidat(candidat:Candidat) {
  var body = JSON.stringify(candidat);
    var headerOptions = new Headers({'content-type':'application/json'});
    var requestOptions = new RequestOptions({method : RequestMethod.Post,headers : headerOptions});
    return this.http
          .post(this.baseUrl+"addCandidat",body,requestOptions);
}
deleteCandidat(id: number) {
  return this.http.delete(this.baseUrl+"deleteCandidat/"+ id);
}
modifierCandidat(id, user) {
  var body = JSON.stringify(user);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  return this.http.put(this.baseUrl+"modifCandidat/" + id,
    body,
    requestOptions).map(res => res.json());
}

checkDate(date:any) {
  const dateFormate = new DatePipe('en-US').transform(date, 'dd/MM/yyyy')
  return dateFormate;
}
modifierEtatCandidat(id, user) {
  var body = JSON.stringify(user);
  var headerOptions = new Headers({ 'Content-Type': 'application/json' });
  var requestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headerOptions });
  console.log(body);
  return this.http.put(this.baseUrl+"modifEtatCandidat/" + id,
  body,
  requestOptions).map(res => res.json());
}
}