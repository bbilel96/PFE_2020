import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, EmailValidator } from '@angular/forms';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import { CustomerService } from 'src/app/Services/customerService/customer.service';
import {  FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Customer } from 'src/app/Interfaces/customer';
import {NavigationExtras, Router} from '@angular/router';
import { Response } from 'src/app/Interfaces/Response';
import {Subject} from 'rxjs';
import {EventsService} from 'src/app/Services/events/events.service';
import {StorageService} from '../../Services/storage/storage.service';
import {AuthService} from '../../Services/storage/auth/auth.service';
import {Capacitor} from "@capacitor/core";





@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {

  /*public  errorMessage = {
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
      {type : 'required', message: 'Password required' },
    ]
  };*/
  isSubmitted = true;

  constructor(private router: Router,
              private events: EventsService,
              // tslint:disable-next-line: no-shadowed-variable
              private FormBuilder: FormBuilder,
              private custService: CustomerService,
              private toastController: ToastController,
              private alertController: AlertController,
              private auth: AuthService,
              private loadingController: LoadingController
             ) { }
pass = '';
mail = '';
msg = null;
msgP = null;
  customers: Customer[];
  connectionForm = this.FormBuilder.group({
    email: new FormControl('', Validators.compose([

      Validators.minLength(3),
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
    ])),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      ]))
  });
  ngOnInit() {

  }
  get email() {
    return this.connectionForm.get('email');
  }
  get password() {
    return this.connectionForm.get('password');
  }
   async login() {
     let msg = '';
     if (!this.connectionForm.valid) {
        if (this.email.errors) {
          if (this.email.hasError('required') ) {
          msg = msg + '<li>required email</li>';
          console.log(msg);
        } else
          if (this.email.hasError('pattern')) {
            msg = msg + '<li>The email address entered is not valid. please correct it and try again</li>';

          } else if ( this.email.getError('minLength')) {
            msg = msg + '<li>The email must contain at least 3 characters and a maximum of 20</li>';
 }

      } if (this.password.errors) {
    if (this.password.hasError('required')) {
    msg = msg + '<li>Required password</li>';
  } else
        if (this.password.hasError('minLength') || this.password.getError('maxLength')) {
            msg = msg + '<li>The password must contain at least 3 characters and a maximum of 20</li>';
        }

     }
        const toast = await this.toastController.create({
             message: msg,
             duration: 4000,
             position: 'top'
         });
        toast.present();
        return ;

    } else {
    const cust: Customer = {
      id: undefined,
      name: undefined,
      password: this.pass,
      email: this.mail,
      state: undefined,
      type: undefined,
      phone: undefined,
      latitude: undefined,
      longitude: undefined
    };
    this.custService.getbyEmail(cust).subscribe(async (data) => {
        // tslint:disable-next-line:label-position
            if (data.response == null) {

                const toast = await this.toastController.create({
                    message: 'Email or password uncorrect. <br> try again. ',
                    duration: 2000,
                    position: 'top'
                });
                toast.present();

            } else {
              let cust1 = undefined;
              this.custService.getbyEmail(cust).subscribe(data1 => {
                    console.log(data1);
                    cust1 = data1.response;
                    console.log(cust1);
                });
              const loading = await this.loadingController.create({
                    message: 'Please wait...',
                    duration: 2000
                });
              await loading.present();
              await loading.onDidDismiss();
              if (cust1.type!='admin'){
              if (cust1.state.toLowerCase() != 'blocked') {
                    this.auth.login(cust1);
                    const toast = await this.toastController.create({
                        message: 'Your are succefully sign in. <br>Welcome back.',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                    console.log('jfjfjfjf');

                    this.router.navigate(['/customer-side-menu/product']);

                } else {
                    const toast = await this.toastController.create({
                        message: 'Your are Blocked. <br>Please contact us for more information.',
                        duration: 2000,
                        position: 'top'
                    });
                    toast.present();
                }
            } else {
                  this.auth.login(cust1);
                  const toast = await this.toastController.create({
                      message: 'Your are succefully sign in. <br>Welcome back.',
                      duration: 2000,
                      position: 'top'
                  });
                  toast.present();
                  console.log('fffffddss');
                  await this.router.navigate(['/side-menu-admin/block']);
              }
            }
  });
  }
  }back() {
      this.router.navigate(['']);
        }


    nav() {
        this.router.navigate(['/log-up']);
    }
}

