import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AlertController, IonSlides, ToastController} from "@ionic/angular";
import {CustomerService} from "../../../Services/customerService/customer.service";
import {Customer} from "../../../Interfaces/customer";
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  data: any;
  c: any = '';
  slideOpts = {
    allowTouchMove: false
  };

  constructor(private router: Router,
              private alertController: AlertController,
              private toastController: ToastController,
              private formBuilder: FormBuilder,
              private custService: CustomerService) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
    }
  }
  form2 = this.formBuilder.group({
    passwordControll: new FormControl('', Validators.compose([
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.required
    ]))
  });
  password = '';
  get getPassword() {
    return this.form2.get('passwordControll');
  }
  msg = '';
  msgPass='';

  ngOnInit() {
  }
  async confirm(c) {
    const  cust: Customer = this.data.user;
    console.log(this.data.response)
    console.log(c);
    if (this.data.check.response == c) {
      await this.slides.slideNext(2000, true);
     /* this.custService.resetPassword(cust).subscribe(async (data) => {

            const toast = await this.toastController.create({
              message: 'Your are succefully reseted your password. <br>',
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
      );*/
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
    this.router.navigate(['reset-password']);
  }
  async resetPassword() {
    this.msgPass = '';
    if (!this.form2.valid) {
      if (this.getPassword.errors) {
        if (this.getPassword.hasError('required')) {
          this.msgPass = 'Password required';
        } else if (this.msgPass.length < 3) {
          this.msgPass = 'password must countain at least 3 caractere';
        }
      }
      const toast = await this.toastController.create({
        message: this.msgPass,
        duration: 2000,
        position: 'top'
      });
      toast.present();
    } else {
      this.data.cust.password = this.password;

      console.log(this.data.cust);
      this.custService.resetPassword(this.data.cust).subscribe(async (data) => {

        if (data.success == true) {
          const toast = await this.toastController.create({
            message: 'Your password reseted.',
            duration: 2000,
            position: 'top'
          });
          toast.present();


          this.router.navigate(['/log-in']);

        } else {
          const alert = await this.alertController.create({
            header: 'Ops',
            message: 'Something goes wrong  !',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }
  }
}
