import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Family} from '../../interface/family';
import {Product} from '../../interface/product';
import {ExtraCharge} from '../../interface/extraCharge';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private Api = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) { }
  addProd(prod: Product): Observable<any> {
    return this.http
      .post<any>(this.Api + 'addProd', prod);
  }
  addExtra(id: number, prod: ExtraCharge): Observable<any> {
    return this.http
      .post<any>(this.Api + 'addExtra/' + id, prod);
  }

}
