import { Injectable } from '@angular/core';
import { Plugins} from '@capacitor/core';
import {BehaviorSubject} from 'rxjs';
import {Platform} from '@ionic/angular';
import {Customer} from '../../../Interfaces/customer';
const { Storage } = Plugins;
const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authentificationState = new BehaviorSubject(false);
  authentificationUrl= new BehaviorSubject(false);
  constructor( private plt: Platform) {
    this.plt.ready().then(() => [
        this.checkToken()
    ]);
  }

    login(cust: Customer) {
      const customer = JSON.stringify(cust);
      return Storage.set({key: TOKEN_KEY, value: customer}).then(res => {
      this.authentificationState.next(true);
    });
}
logout() {
  return Storage.remove({key: TOKEN_KEY}).then(() => {
    this.authentificationState.next(false);
  });
}
  isAuthentificated() {
    return this.authentificationState.value;
  }
  changeValue(){
    this.authentificationUrl.next(true);
  }

  checkToken() {
    return Storage.get({key: TOKEN_KEY}).then(res => {
      if (res.value != null) {
        console.log(res.value != null);
        this.authentificationState.next(true);
      }
    });
  }
  async getuser() {
    const data =  await Storage.get({key: TOKEN_KEY});
    console.log( JSON.parse(data.value))
    return JSON.parse(data.value);


  }

}

