import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../../Services/storage/auth/auth.service';
import {StorageService} from '../../../../../../Services/storage/storage.service';
import {Router} from '@angular/router';
import {ModalController} from '@ionic/angular';
import {CommandCustomer} from '../../../../../../Interfaces/CommandCustomer';
import {Command} from '../../../../../../Interfaces/Command/command';
import {CommandhistoryComponent} from '../../../../../../Componenets/description/command/commandHistory/commandhistory/commandhistory.component';
import {CustomerDetailsComponent} from '../../../../../../Componenets/customer-details/customer-details.component';
import {CustomerService} from '../../../../../../Services/customerService/customer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  data: any;
  val = '';
  customer: Array<CommandCustomer> = [];
  constructor(private customerService: CustomerService,
              private modelCtlr: ModalController,
              private authService: AuthService,
              private prodStorage: StorageService,
              private router: Router,
              private modelCltrl: ModalController) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state.customers;
      console.log(this.data);
    }
  }

  ngOnInit() {
  }
  changeCheck(x: CommandCustomer) {
    console.log(x.id);
    for (const c of this.customer) {
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
  handleInput(event) {
    this.customer = this.data;
    this.val = event.target.value;
    if (this.val && this.val.trim() !== '') {
      this.customer = this.customer.filter((x) => {
        return (x.email.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      });
    }

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
    modal.dismiss();
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
          this.customer = data1 as unknown as CommandCustomer[];
          for (const c of this.customer) {
            c.check = false;
          }

        });
      }
    });
    modal.present();

  }

  portChange() {

  }

    back() {
      this.router.navigate(['side-menu-admin/block']);
    }
}
