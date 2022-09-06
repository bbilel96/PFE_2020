import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Command} from "../../Interfaces/Command/command";
import {Observable} from "rxjs";
import {Restaurant} from "../../Interfaces/restaurant/Restaurant";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private Api = 'http://192.168.43.131:8000/api/';
  constructor(private http: HttpClient) { }
  getRestaurant(): Observable<Restaurant> {
    return this.http.get<Restaurant>(this.Api + 'getRestaurant');
  }

}
