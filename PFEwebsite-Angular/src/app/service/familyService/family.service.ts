import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Family} from '../../interface/family';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private Api: string = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}
  getAll(): Observable<Family[]> {
    return this.http
      .get<Family[]>(this.Api + 'getAll');
  }
  get(): Observable<Family[]> {
    return this.http
      .get<Family[]>(this.Api + 'get');
  }
}
