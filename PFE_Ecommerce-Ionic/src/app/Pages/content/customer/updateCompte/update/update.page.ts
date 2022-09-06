import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../../../Services/storage/auth/auth.service';
import {Customer} from '../../../../../Interfaces/customer';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {CustomerService} from '../../../../../Services/customerService/customer.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  nameInput = '';
  phoneInput = '';
  passwordInput = '';

  constructor(private toastController: ToastController,
              private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private loadingController: LoadingController,
              private customerService: CustomerService,
              private alertController: AlertController) {
  }

  cust: Customer;
  form = this.formBuilder.group({

    phone: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8)
    ])),
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[A-Za-z]{2,8}')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])),

  });

  ngOnInit() {
  }

  get getName() {
    return this.form.get('name');
  }

  get gePassword() {
    return this.form.get('password');
  }

  get getPhone() {
    return this.form.get('phone');
  }

  async ionViewDidEnter() {
    this.cust = await this.authService.getuser();
    console.log(this.cust);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 3000
    });
    this.customerService.updateAccountForEmail(this.cust).subscribe(data => {
      console.log(data);
      this.cust = data.response as unknown as Customer;

    });
    await loading.present();
    await loading.onDidDismiss();
    console.log(this.cust);
  }

  async form1() {
      let msg = '';
      if (!this.form.valid || this.phoneInput.length != 8 || isNaN(Number(this.phoneInput))) {
          if (this.getName.hasError('required') && this.getName.hasError('required') && this.getName.hasError('required')) {
              msg = msg + '<li>Input Can\'t be required</li>';
          } else if (this.getName.hasError('pattern')) {
              msg = msg + '<li>Name input is invalid</li>';
          }
          if (this.getPhone.hasError('required') || (this.phoneInput.length != 8 || isNaN(Number(this.phoneInput)))){
              msg = msg + '<li>Phone input is invalid</li>';
          }
          console.log(msg);
          console.log(this.getName.hasError('pattern') || this.getName.hasError('pattern') || (this.getPhone.hasError('required') || this.phoneInput.length != 8 || isNaN(Number(this.phoneInput))));
          // tslint:disable-next-line:max-line-length
          if (this.getName.hasError('pattern') || this.getName.hasError('pattern') || (this.getPhone.hasError('required') || (this.phoneInput.length != 8 || isNaN(Number(this.phoneInput))))) {
              const toast = await this.toastController.create({
                  message: msg,
                  duration: 4000,
                  position: 'top'
              });
              toast.present();
          } else {
              this.cust.name = this.nameInput;
              this.cust.password = this.passwordInput;
              this.cust.phone = this.phoneInput;
              console.log(this.cust);
              this.customerService.updateAccount(this.cust).subscribe(data => {
                      console.log('kzkzk', data);
                      this.cust =  data.response as unknown as Customer;
                  },
                  async error => {
                      const alert = await this.alertController.create({
                          header: 'Ops',
                          message: 'Something went wrond <br> Try to later',
                          buttons: ['OK']
                      });
                      await alert.present();
                  },
                     () => {
                         this.authService.login(this.cust);
                         console.log(this.cust);
                         this.router.navigate(['/customer-side-menu/product']);
                     });

          }
      } else {
          console.log(this.cust);
          this.cust.name = this.nameInput;
          this.cust.password = this.passwordInput;
          this.cust.phone = this.phoneInput;
          console.log(this.cust);
          this.customerService.updateAccount(this.cust).subscribe(data => {
                  console.log('ffffff', data);
                  this.cust = data.response  as unknown as Customer ;
              },
              async error => {
                  const alert = await this.alertController.create({
                      header: 'Ops',
                      message: 'Something went wrong .<br> Try to later',
                      buttons: ['OK']
                  });

                  await alert.present();
              },
              async () => {
                  this.authService.login(this.cust);
                  console.log(this.cust);
                  const toast = await this.toastController.create({
                      message: 'Your account has been updated',
                      position: 'top',
                      duration: 3000
                  });
                  toast.present();
              }
              );
      }
  }
}
