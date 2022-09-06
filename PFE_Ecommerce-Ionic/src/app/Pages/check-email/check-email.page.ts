import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, ToastController} from "@ionic/angular";
import {CustomerService} from "../../Services/customerService/customer.service";
import {Customer} from "../../Interfaces/customer";

@Component({
  selector: 'app-check-email',
  templateUrl: './check-email.page.html',
  styleUrls: ['./check-email.page.scss'],
})
export class CheckEmailPage implements OnInit {
data: any;
  c: any = '';
  constructor(private router: Router,
              private alertController: AlertController,
              private toastController: ToastController,
              private custService: CustomerService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
    }
  }

  ngOnInit() {
  }
async confirm(c) {
    const  cust: Customer = this.data.user;
  if (this.data.code == c) {
    this.custService.create(cust).subscribe(async (data) => {

          const toast = await this.toastController.create({
            message: 'Your are succefully sign up <br>Welcome.',
            duration: 2000,
            position: 'top'
          });
          toast.present();

          this.router.navigate(['/']);
        },
        async error => {
          const alert = await this.alertController.create({
            header: 'ops',
            message: 'Something Wrong!',
            buttons: ['OK']
          });
          alert.present();
        }
    );
  } else {
    const toast = await this.toastController.create({
      message: 'the code input is wrong',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}

  back() {
    this.router.navigate(['log-up']);
  }
}
