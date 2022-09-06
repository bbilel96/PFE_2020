import { Injectable } from '@angular/core';
import {Customer} from "../../Interfaces/customer";
import {Observable} from 'rxjs';
import {Command} from '../../Interfaces/Command/command';
import {HttpClient} from '@angular/common/http';
import {CommandCustomer} from "../../Interfaces/CommandCustomer";

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private Api = 'http://192.168.43.131:8000/api/';
  constructor(private http: HttpClient) { }
  create(command: Command): Observable<Command> {
    return this.http.post<Command>(this.Api + 'command', command);
  }
  getCommand(id: number): Observable<Command> {
    return this.http.get<Command>(this.Api + 'getCommand/' + id);
  }
  deleteCommand(id: number) {
    return this.http.delete<Command>(this.Api + 'deleteCommand/' + id);
  }

}
