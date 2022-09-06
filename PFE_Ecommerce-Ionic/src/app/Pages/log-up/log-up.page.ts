import { Component, OnInit, ViewChild } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { CustomerService } from 'src/app/Services/customerService/customer.service';
import {  Validators, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/Interfaces/customer';
import { IonSlides } from '@ionic/angular';
import { Response } from 'src/app/Interfaces/Response';
import { Error_inputs } from 'src/app/Interfaces/errors/error_inputs';
import { ɵNgStyleR2Impl } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-log-up',
  templateUrl: './log-up.page.html',
  styleUrls: ['./log-up.page.scss'],
})
export class LogUpPage implements OnInit {

  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  public errorMessage = {
    name: [
      {type: 'required', message: 'Email required' },
      { type: 'required', message: 'Email required' }

    ],
    email: [
      { type: 'required', message: 'Email required' },
      { type: 'minLength', message: 'Email length must longer or equal to 3' },
      { type: 'maxLength', message: 'Email length must lower or equal to 20' },
      { type: 'pattern', message: 'Please enter a valid email' }
    ],
    password: [
      {
        type: 'minLength', message: 'Email length must longer or equal to 4'
      },
      { type: 'required', message: 'Password required' },
    ]
  };
  cust: Customer = {
    id: undefined,
    name: undefined,
    password: undefined,
    email: undefined,
    state: undefined,
    phone: undefined,
    latitude:undefined,
    longitude:undefined,
    type: 'customer'

  };
  code: string;

  nameInput = '';

  password = '';
  email = '';
  cPassword = '';
  ph = '';
  adr = '';
  msgPh = '';
  msgAdre = '';
  msgEmail = '';
  msgPass = '';
  msgFn = '';
  msgLn = '';

  slideOpts = {

    allowTouchMove: false
};
  constructor(private custService: CustomerService,
              private loadingController: LoadingController,
              // tslint:disable-next-line: no-shadowed-variable
              private FormBuilder: FormBuilder,
              private alertController: AlertController,
              private router: Router,
              private toastController: ToastController,
              private geolocation: Geolocation) { }
   isSubmitted = true;
  // tslint:disable-next-line: variable-name
  l_Name = '';
  // tslint:disable-next-line: variable-name
  f_Name = '';
  cPass = '';
  mail = '';
  pass = '';
  msg = '';

  customers: Customer[];
  form3 = this.FormBuilder.group({

    phone: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(8)
    ])),
  });
  form1 = this.FormBuilder.group({
    email: new FormControl('', Validators.compose([
      Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
      Validators.required
    ])),
   /* password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])),*/
   /* cPassword: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])),*/
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('[A-Za-z]{2,8}')
    ])),


  });
  form2 = this.FormBuilder.group({

   password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ])),
    cPassword: new FormControl('', Validators.compose([

    ])),

  });




  ngOnInit() {


  }

  get name() {
    return this.form1.get('name');
  }
  get email1() {
    return this.form1.get('email');
  }
  get password1() {
    return this.form2.get('password'); }
  get getPhone() {
    return this.form3.get('phone');
  }
  async step1() {
    let msg = '';
    if (!this.form1.valid) {
      if (this.name.errors) {
        if (this.name.hasError('required')) {
         msg = msg + '<li>name input is required</li>';

        } else if (this.name.hasError('pattern')) {
          msg = msg + '<li>Name input is invalid</li>';

        }

       // tslint:disable-next-line: align
       }  if (this.email1.errors) {
          if (this.email1.hasError('required') ) {
            msg = msg + '<li>Email input is required</li>';

          } else
            if (this.email1.hasError('pattern')) {
              msg = msg + '<li>The email address entered is not valid. please correct it and try again</li>';
            } else if ( this.email1.hasError('minLength')) {
              msg = msg + '<li>The email must contain at least 3 characters and a maximum of 20</li>';

            }

        }
      const toast = await this.toastController.create({
          message: msg,
          duration: 4000,
          position: 'top'
        });
      toast.present();
    } else {
      console.log(this.mail);
      this.cust.email = this.mail.toLowerCase();
      this.custService.checkEmail(this.cust).subscribe(async (data) => {
        console.log(data);
        if (!data) {
              await this.slides.slideNext(2000, true);
        } else {
          const toast = await this.toastController.create({
            message: 'Email already used <br> Try another one .',
            duration: 4000,
            position: 'top'
          });
          toast.present();
        }
    },
    async error => {
      const alert = await this.alertController.create({
        header: 'ops',
        message: 'Something Wrong!',
        buttons: ['OK']
      });
      alert.present();
    });
    }
  }
  async step2() {
    if (!this.form2.valid) {
      if (this.password1.errors) {
        if (this.password1.hasError('required')) {
          const toast = await this.toastController.create({
            message: 'Password input is required',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        } else if (this.password1.hasError('minLength')) {
          const toast = await this.toastController.create({
            message: 'Password should at least 3 caractere.',
            duration: 2000,
            position: 'top'
          });
          toast.present();
        }

        return;
      }

    } else
        // tslint:disable-next-line:triple-equals
    if (this.pass != this.cPass) {
      const alert = await this.alertController.create({
        header: 'Error Password',
        message: 'Confirm Your password !',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      await this.slides.slideNext(2000, true);
    }
}
  async step3() {
    console.log(isNaN(Number(this.ph)));
    if (!this.form3.valid || this.ph.length != 8 || isNaN(Number(this.ph))) {
    if (this.getPhone.errors) {
      if (this.ph.length != 8 || isNaN(Number(this.ph))) {
          const toast = await this.toastController.create({
            message: 'check your phone input',
            duration: 2000,
            position: 'top'
          });
          toast.present();
      } else if (this.getPhone.hasError('required')) {
        const toast = await this.toastController.create({
          message: 'Phone input is required.',
          duration: 2000,
          position: 'top'
        });
        toast.present();
      }
      }
    console.log('bilel');
    return;
  } else {

    /*this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
    console.log(data.coords.latitude);
    this.cust.latitude = data.coords.latitude;
    console.log(data.coords.longitude);
    this.cust.longitude = data.coords.longitude;
     });*/

    this.cust.password = this.pass;
    this.cust.phone = this.ph;

    this.cust.name = this.nameInput;
    this.cust.state = 'active';
    console.log(this.cust);
    this.custService.sendEmail(this.cust).subscribe(data => {
      this.code = data.response;
      const navigationExtras: NavigationExtras = {
        state: {
          user: this.cust,
          code: this.code
        }
      };
      this.router.navigate(['/check-email'], navigationExtras);
    });
   }
  }
back2() {
  this.slides.slideTo(1, 2000);
}
 back1() {
  this.slides.slideTo(0, 2000);
}
  back() {
    this.router.navigate(['/log-in']);
  }

  nav() {
    this.router.navigate(['/log-in']);
  }
}






    /*if (!this.form1.valid) {
      if (this.email1.getError('required') ) {
        this.msg='required email';
        console.log(this.msg);
        return ;
      } else
        if (this.email.getError('pattern')) {
          this.msg='The email address entered is not valid. please correct it and try again';
          console.log(this.msg);
          return ;
        } else if ( this.email.getError('minLength')) {
          this.msg='The email must contain at least 3 characters and a maximum of 20';
          return ;
}
      if (this.password.getError('required')) {
        this.msgP='Required password';
        console.log(this.msgP);
        return ;
      } else
        if (this.password.getError('minLength') || this.password.getError('maxLength')) {
          this.msgP='The password must contain at least 3 characters and a maximum of 20';
          console.log(this.msgP);
          return ;
        }
    this.custService.checkEmail(this.mail).subscribe(async (data) => {
        if (data) {
              this.slides.slideNext(2000, true);
        } else {
               const alert = await this.alertController.create({
                 header: 'Can\'t log up',
                 message: 'Email used try to use another one  !',
                 buttons: ['OK']
               });
               await alert.present();
        }
    });

}
step2() {
  if (this.pass!=this.cPass){
    console.log("Password must be confirmed !");
    return;
  }
  this.slides.slideNext(2000, true);

}

  step3() {
    const cust: Customer = {
      id: undefined,
      lName: this.l_Name,
      fName: this.f_Name,
      password: this.pass,
      email: this.mail,
      state: 'actif',
      phone: this.ph,
      adresse: this.adr
    };
    console.log(cust);
    this.custService.create(cust).subscribe((data) => { console.log('ajouter avec succes'); });

  }

  /*async signUp() {
    if (this.pass != this.cPass) {
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: 'Confirm your password !',
          buttons: ['OK']
        });
        await alert.present();
      } else {

        const cust: Customer = {
          id: undefined,
          fName: this.f_Name,
          lName: this.l_Name,
          password: this.pass,
          email: this.mail
        };
        console.log(cust);
        this.custService.create(cust).subscribe(() => {}
          ,
          async () => {
            const alert = await this.alertController.create({
              header: 'Can\'t log up',
              message: 'Email used try to use another one  !',
              buttons: ['OK']
            });
            await alert.present();
          });
      }
    }*/
