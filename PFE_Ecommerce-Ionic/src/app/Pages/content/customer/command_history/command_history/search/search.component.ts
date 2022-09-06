import { Component, OnInit } from '@angular/core';
import {CommandCustomer} from "../../../../../../Interfaces/CommandCustomer";
import {CustomerService} from "../../../../../../Services/customerService/customer.service";
import {ModalController, ToastController} from "@ionic/angular";
import {AuthService} from "../../../../../../Services/storage/auth/auth.service";
import {StorageService} from "../../../../../../Services/storage/storage.service";
import {Router} from "@angular/router";
import {Command} from "../../../../../../Interfaces/Command/command";
import {CommandhistoryComponent} from "../../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component";
import {CustomerDetailsComponent} from "../../../../../../Componenets/customer-details/customer-details.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  data: any;
  val = '';
  command: Array<Command> = [];
  constructor(private customerService: CustomerService,
              private modelCtlr: ModalController,
              private authService: AuthService,
              private prodStorage: StorageService,
              private router: Router,
              private modelCltrl: ModalController,
              private toastController: ToastController) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.commands;
      console.log(this.data);
    }
  }

  ngOnInit() {
  }
  handleInput(event) {

    this.command = this.data;
    this.val = event.target.value;
    if (this.val && this.val.trim() !== '') {
      this.command = this.command.filter((x) => {
        return (x.date_command.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      });
    }
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Command has been canceled',
      duration: 2000,
      position: "top"
    });
    await toast.present();
  }
  async descriptionC(c: Command) {
    const modal = await this.modelCtlr.create({
      component: CommandhistoryComponent,
      componentProps: {
        command: c,
        customer: this.data.user,
        admin: false
      }
    });
    modal.dismiss();
    modal.present();

  }

  portChange() {

  }

  back() {
    this.router.navigate(['side-menu-admin/block']);
  }

}
