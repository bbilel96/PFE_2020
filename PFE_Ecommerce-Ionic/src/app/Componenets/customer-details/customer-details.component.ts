import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController, NavParams, ToastController} from "@ionic/angular";
import {CommandCustomer} from '../../Interfaces/CommandCustomer';
import {CustomerService} from "../../Services/customerService/customer.service";
import leaflet from 'leaflet';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  c: CommandCustomer;
  @ViewChild('map', {static: true}) mapContainer: ElementRef;
  constructor(private navParams: NavParams,
              private customerController: CustomerService,
              private view: ModalController,
              private alertController: AlertController,
              private toastController: ToastController) {
    this.c = this.navParams.data.c;
  }
  map: any;

  ngOnInit() {
    console.log(this.c);
  }
  ionViewDidEnter() {
    if (this.c.longitude!= null && this.c.latitude!= null)
    this.loadMap();
  }
  loadMap() {
    this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18,
    }).addTo(this.map);
    leaflet.marker([this.c.latitude, this.c.longitude]).addTo(this.map);
    this.map.setView([this.c.latitude, this.c.longitude], 6);
  }
  async error(msg) {
    const alert = await this.alertController.create({
      header: 'Ops',
      message: msg,
      buttons: ['Ok']
    });
    await alert.present();
  }
  back() {
    this.view.dismiss('0');
  }
  async changeState() {
    let msg = '';
    let toast1 = '';
    if (this.c.state.toLocaleLowerCase() == 'active') {
      msg = 'Do you really want to block this customer?';
      toast1 = 'Customer has been blocked';
    } else {
      msg = 'Do you really want to make this customer active ?';
      toast1 = 'Customer has been activated';
    }
    const alert = await this.alertController.create({
      header: 'Choose to continue!',
      message: msg,
      buttons: [
        {
          text: 'Yes',
          handler: async () => {

            this.customerController.changeState(this.c).subscribe(async data => {
                  this.view.dismiss('1');
                  console.log(data);
                  const toast = await this.toastController.create({
                    message: toast1,
                    duration: 2000,
                    position: "top"
                  });
                  await toast.present();
                },
                error => {
                  error('Something wrong ..');
                });
          }
        },
        {
          text: 'No'
        }
      ]
    });
    alert.present();
  }
}
