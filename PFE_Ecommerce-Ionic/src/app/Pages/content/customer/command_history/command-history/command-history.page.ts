import { Component, OnInit } from '@angular/core';
import {CommandService} from '../../../../../Services/commandService/command-service.service';
import {Command} from '../../../../../Interfaces/Command/command';
import {NavigationExtras, Router} from '@angular/router';
import {Family} from '../../../../../Interfaces/products/family';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {ProductComponent} from '../../../../../Componenets/description/product/product.component';
// tslint:disable-next-line:max-line-length
import {CommandhistoryComponent} from '../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component';
@Component({
  selector: 'app-command-history',
  templateUrl: './command-history.page.html',
  styleUrls: ['./command-history.page.scss'],
})
export class CommandHistoryPage implements OnInit {
  constructor(private modelCtlr: ModalController ,
              private commandService: CommandService,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController) {}
  command: Command[];
  command1: Command[] = [];
  data: any;
  async ionViewWillEnter() {
    console.log('bilel');

    this.commandService.getCommand(this.data.user.id).subscribe((data) => {
      this.command = data as unknown as Command[] ;
      console.log(this.command);
    });
  }
  async ngOnInit() {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
    }
  }
  async openCommand(c: Command) {
    console.log('xxxxx');
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Command has been canceled',
      duration: 2000,
      position: "top"
    });
    toast.present();
  }

  portChange() {

    const navigationExtras: NavigationExtras = {state: {
        commands: this.command,
        user: this.data.user
      }
    };

    this.router.navigate(['customer-side-menu/command-history/search'], navigationExtras);

  }
}
