import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/Services/customerService/customer.service';
import {  FormGroup, Validators, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AlertController, IonSlides, ToastController } from '@ionic/angular';
import { Customer } from 'src/app/Interfaces/customer';
import {NavigationExtras, Router} from '@angular/router';
// import { Email } from '@teamhive/capacitor-email';



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  cust: Customer = {
    id: undefined,
    name:undefined,
    password: undefined,
    email: undefined,
    state: undefined,
    phone: undefined,
    longitude:undefined,
    latitude:undefined,
    type:undefined
  };
  @ViewChild(IonSlides, {static: false}) slides: IonSlides;
  constructor(private alertController: AlertController,
              // tslint:disable-next-line: no-shadowed-variable
              private FormBuilder: FormBuilder,
              private custService: CustomerService,
              private router: Router,
             private toastController:ToastController
              ) {}
  msg = '';
  msgPass='';
  email: string = null;


  slideOpts = {
    allowTouchMove: false
};
  form1 = this.FormBuilder.group({
    emailControll: new FormControl('', Validators.compose([
      Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
      Validators.required
    ]))
  });
  form2 = this.FormBuilder.group({
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
get getEmail() {
  return this.form1.get('emailControll');
}
  ngOnInit() {
  }

  async checkEmail() {
    let msg = '';
    if (!this.form1.valid) {
      if (this.getEmail.hasError('required')) {
        msg =  'required email';
        console.log(this.msg);

      } else if (this.getEmail.hasError('pattern')) {
        msg = 'The email address entered is not valid';
        console.log(this.msg);
      }
      const toast = await this.toastController.create({
        message: msg,
        duration: 4000,
        position: 'top'
      });
      toast.present();
    } else {
      console.log(this.email);
      this.cust.email = this.email;
      this.custService.sendEmailReset(this.cust).subscribe(async (data) => {
        console.log(data);
        if (data.success == true) {
          const navigationExtras: NavigationExtras = {
            state: {
              cust: this.cust,
              check: data
            }
          };
          await this.router.navigate(['check-reset'], navigationExtras);
        } else {
          const alert = await this.alertController.create({
            header: 'Ops',
            message: 'Email does not Exist  !',
            buttons: ['OK']
          });
          await alert.present();
        }
      });
    }


    /*const email1 = new Email();

    const hasPermission = await email1.hasPermission();

    if(!hasPermission){
        await email1.requestPermission();
    }

    const available = await email1.isAvailable({
          alias: 'gmail' // gmail, outlook, yahoo *optional*,
    });

    // available.hasAccount  *If email is setup*
    // available.hasApp  *If device has alias supplied*


    if(available.hasAccount){
        email1.open({
        to:[this.mail],
        cc: ['789'],
        bcc: ['789'],
        subject: 'Party',
        body: 'Hi bring drinks...',
        isHtml: false,
        attachments: []
        })

    }
    /*    let email={
          to: this.mail,
          cc:"" ,
          bcc: [],
          attachments: [
          ],
          subject: 'Cordova Icons',
          body: 'How are you? Nice greetings from Leipzig',
          isHtml: false

        }
        console.log(this.emailComposer.open(email));
        this.emailComposer.open(email);
        const alert = await this.alertController.create({
          header: 'Confirm',
          message: 'Confirm your password !',
          buttons: ['OK']
        });
        await alert.present();*/

  }
    resetPassword() {
      if (!this.form2.valid){
        if(this.getPassword.errors){
          if(this.getPassword.hasError('required')){
            this.msgPass="Password required";
          }
          else if(this.getPassword.hasError('minLength')||this.getPassword.hasError('maxLength'))
          {
            this.msgPass="password must countain at least 3 caractere";
          }
        }
      }
      this.cust.password = this.password;

      console.log(this.cust);
      this.custService.resetPassword(this.cust).subscribe(async (data) => {

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

    back() {
        this.router.navigate(['/log-in']);
    }
}

