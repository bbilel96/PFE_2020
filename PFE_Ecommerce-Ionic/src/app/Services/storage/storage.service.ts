import { Injectable } from '@angular/core';
import { Plugins} from '@capacitor/core';
import {User} from '../../Interfaces/users/user';
import {userError} from '@angular/compiler-cli/src/transformers/util';
import {Customer} from '../../Interfaces/customer';
import {Family} from '../../Interfaces/products/family';
import {StorageProd} from "../../Interfaces/storage/storageProd";
const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})


export class StorageService {

  card: StorageProd;
  constructor() { }
  async setCard(card: Family[], count: number) {
    const c = JSON.stringify(card);
    await Storage.set({
      key: 'card',
      value: c});
    const count1 = JSON.stringify(count);
    await Storage.set({
      key: 'count',
      value: count1});

  }
  async setCommand() {
    const c = JSON.stringify(1);
    await Storage.set({
      key: 'command',
      value: c});

  }
  async deleteCommand() {
    return Storage.remove({key: 'command'});
  }
  async getCard() {
    const data =  await Storage.get({key: 'card'});
    if (data.value == null){
      return [];
    }
    console.log( JSON.parse(data.value))
    return JSON.parse(data.value);
  }
  async getCommand() {
    const data = await Storage.get({key: 'command'});
    return JSON.parse(data.value);
  }
  async getCount() {
    const data =  await Storage.get({key: 'count'});
    if (data.value == null) {
      return 0;
    }
    console.log( JSON.parse(data.value))
    return JSON.parse(data.value);
  }

}
