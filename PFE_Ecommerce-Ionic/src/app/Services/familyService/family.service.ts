import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from 'src/app/Interfaces/products/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {
  private Api: string = 'http://192.168.43.131:8000/api/';
  constructor(private http: HttpClient) {}
    getAll(): Observable<Family[]> {
        return this.http
          .get<Family[]>(this.Api + 'get');
   }
}
