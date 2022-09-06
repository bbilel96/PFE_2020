import { Component, OnInit } from '@angular/core';
import {Command} from "../../../../../../Interfaces/Command/command";
import {CustomerService} from "../../../../../../Services/customerService/customer.service";
import {ModalController} from "@ionic/angular";
import {AuthService} from "../../../../../../Services/storage/auth/auth.service";
import {StorageService} from "../../../../../../Services/storage/storage.service";
import {Router} from "@angular/router";
import {CommandhistoryComponent} from "../../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component";
import {DatePipe} from "@angular/common";

@Component({
  providers: [DatePipe],
  selector: 'app-search-command',
  templateUrl: './search-command.page.html',
  styleUrls: ['./search-command.page.scss'],
})
export class SearchCommandPage implements OnInit {

  data: any;
  val = '';
  command: Array<Command> = [];
  constructor(private customerService: CustomerService,
              private modelCtlr: ModalController,
              private authService: AuthService,
              private prodStorage: StorageService,
              private router: Router,
              private modelCltrl: ModalController,
              private pipeDate: DatePipe) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
    }
  }

  ngOnInit() {
  }
  handleInput(event) {
    this.command = this.data.commands;
    this.val = event.target.value;
    console.log(this.command);
    if (this.val && this.val.trim() !== '') {
      this.command = this.command.filter((x) => {
        return (this.pipeDate.transform(x.date_command, 'medium').toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      });
    }
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
    modal.onDidDismiss().then(data => {
      if (data.role == '2') {
        for (let i in this.command) {
          console.log(i);
          if (this.command[i].id === data.data) {
            this.command[i].state = 'Cancel';
          }
        }
      }
    });
    await modal.present();

  }

  portChange() {

  }

  back() {
    this.router.navigate(['customer-side-menu/command-history']);
  }
}
