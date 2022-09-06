import { Injectable } from '@angular/core';
import { Customer } from 'src/app/Interfaces/customer';
import { Response } from 'src/app/Interfaces/Response';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {CommandCustomer} from '../../Interfaces/CommandCustomer';



@Injectable({
  providedIn: 'root'
})
export class CustomerService implements Resolve<any> {
 private Api = 'http://192.168.43.131:8000/api/';

  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot) {
      const cust1 = route.paramMap.get('cust');
      return 'bilelsaiden';
  }
  sendEmail(cust: Customer): Observable<Response> {
      return this.http.post<Response>(this.Api + 'sendMail', cust);
  }
  create(cust: Customer): Observable<Customer> {

    return this.http.post<Customer>(this.Api + 'user', cust);
  }
  checkEmail(cust: Customer): Observable<number> {
    return this.http.post<number>(this.Api + 'checkEmail', cust);
  }
  getbyEmail(cust: Customer): Observable<Response> {
    return this.http.post<Response>(this.Api + 'getbyEmail', cust);
  }
  resetPassword(cust: Customer): Observable<Response> {
    return this.http.put<Response>(this.Api + 'resetPassword', cust);
  }
    updateAccount(cust: Customer): Observable<Response> {
        return this.http.put<Response>(this.Api + 'updateAccount', cust);
    }
    addPos(cust: Customer): Observable<Customer> {
      return this.http.put<Customer>(this.Api + 'addPos', cust);
    }
    updateAccountForEmail(cust: Customer): Observable<Response> {
        return this.http.post<Response>(this.Api + 'checkEmailForUp', cust);
    }
    getAll(): Observable<CommandCustomer> {
      return this.http.get<CommandCustomer>(this.Api + 'users');
    }
    changeState(c: CommandCustomer): Observable<number> {
        return this.http.put<number>(this.Api + 'changeState/' , c);
    }
    sendEmailReset(c: Customer): Observable<Response> {
      return this.http.post<Response>(this.Api + 'checkEmailRes', c);
    }
}
