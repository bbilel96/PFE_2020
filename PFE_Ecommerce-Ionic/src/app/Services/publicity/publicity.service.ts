import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Response} from '../../Interfaces/response';
import {Observable} from 'rxjs';
import {Publicity} from '../../Interfaces/publicity';

@Injectable({
  providedIn: 'root'
})
export class PublicityService  {
  private Api = 'http://192.168.43.131:8000/api/';
constructor(private http: HttpClient) { }

getPub(): Observable<Publicity> {
  return this.http.get<Publicity>(this.Api + 'getPublicity');
}

}
