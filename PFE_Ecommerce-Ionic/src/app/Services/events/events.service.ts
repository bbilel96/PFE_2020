import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }
  private fooSubject = new Subject<any>();

  publish(data: any) {
    this.fooSubject.next(data);
  }

  Observable(): Subject<any> {
    return this.fooSubject;
  }
}
