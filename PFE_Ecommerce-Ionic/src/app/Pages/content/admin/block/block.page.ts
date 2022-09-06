import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../Services/customerService/customer.service';
import {CommandCustomer} from '../../../../Interfaces/CommandCustomer';
import {Command} from '../../../../Interfaces/Command/command';
import {CommandhistoryComponent} from '../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component';
import {ModalController} from '@ionic/angular';
import {CustomerDetailsComponent} from "../../../../Componenets/customer-details/customer-details.component";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-block',
  templateUrl: './block.page.html',
  styleUrls: ['./block.page.scss'],
})
export class BlockPage implements OnInit {

  constructor(private customerService: CustomerService,
              private modelCtlr: ModalController,
              private  router: Router) { }
commandC: CommandCustomer[];
  ionViewDidEnter() {
    this.customerService.getAll().subscribe(data => {
      this.commandC = data as unknown as CommandCustomer[];
      for (const c of this.commandC) {
        c.check = false;
      }
      console.log(this.commandC);
    });
  }
  ngOnInit() {
  }

  changeCheck(x: CommandCustomer) {
console.log(x.id);
for (const c of this.commandC) {
      if (x.id !== c.id) {
        c.check = false;
      } else {
        if (c.check == true) {
          c.check = false;
        } else {
          c.check = true;
        }
      }
    }
  }

  test(x) {
    console.log(x);
  }
  portChange() {

    const navigationExtras: NavigationExtras = {state: {
        customers: this.commandC
      }
    };

    this.router.navigate(['side-menu-admin/search'], navigationExtras);

  }
  async descriptionC(c: Command, cc: CommandCustomer) {
    const modal = await this.modelCtlr.create({
      component: CommandhistoryComponent,
      componentProps: {
        command: c,
        customer: cc,
        admin: true
      }
    });
    modal.present();

  }



  async detail(cc: CommandCustomer) {
    console.log(cc);
    const modal = await this.modelCtlr.create({
      component: CustomerDetailsComponent,
      componentProps: {
        c: cc,
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.data == '1') {
        this.customerService.getAll().subscribe(data1 => {
          this.commandC = data1 as unknown as CommandCustomer[];
          for (const c of this.commandC) {
            c.check = false;
          }

        });
      }
    });
    modal.present();

  }


}
