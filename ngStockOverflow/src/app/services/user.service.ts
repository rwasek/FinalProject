import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from '../models/post';
import { AuthService } from './auth.service';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8090/';
  private url = this.baseUrl + 'api/user';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getUserStock(){
    const credentials = this.auth.getCredentials();
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return this.http.get<Stock[]>(this.url + 's/stocks', httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log('error in get user stock user serv');
        return throwError('error in get user stock user serv')
      })
    )

  }

}
