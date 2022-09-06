import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController, LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import leaflet from 'leaflet';
import {Command} from '../../../../../Interfaces/Command/command';
import {Customer} from '../../../../../Interfaces/customer';
import {CommandService} from '../../../../../Services/commandService/command-service.service';
import {Restaurant} from "../../../../../Interfaces/restaurant/Restaurant";
import {RestaurantService} from "../../../../../app/Services/restaurant.service";
@Component({
  selector: 'app-commandhistory',
  templateUrl: './commandhistory.component.html',
  styleUrls: ['./commandhistory.component.scss'],
})
export class CommandhistoryComponent implements OnInit {
  constructor(private restaurantService: RestaurantService,
              private view: ModalController,
              private navParams: NavParams,
              private commandService: CommandService,
              private loadingController: LoadingController,
              private alertController: AlertController,
              private toastController: ToastController) {
    this.c = this.navParams.data.command;
    this.cust = this.navParams.data.customer;
    this.admin = this.navParams.data.admin;
    console.log(this.c);
    console.log(this.cust);
  }
  admin:boolean;
  greenIcon = leaflet.icon({
    iconUrl: "../../../../../../assets/img/restaurant.png"
    // shadowUrl: 'leaf-shadow.png'
  });
  cust: Customer;
  c: Command;
  map: any;
  myDate: string = new Date().toISOString();
  date: string;
  data: any;
  @ViewChild('map', {static: true}) mapContainer: ElementRef;
  eLatitude: number;
  eLongitude: number;
  rest: Restaurant;
  ngOnInit() {
    console.log(this.c);
  }
  async ionViewDidEnter() {
    this.restaurantService.getRestaurant().subscribe(data => {
      this.rest = data;
    });
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
    await loading.onDidDismiss();
    this.loadMap();
  }
  back() {
    this.view.dismiss('1');
  }
  loadMap() {
    this.map = leaflet.map('map').fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    const circle = leaflet.circle([this.rest.latitude, this.rest.longitude], {
      color: 'green',
      fillOpacity: 0.1,
      radius: this.rest.radius
    }).addTo(this.map);

    leaflet.marker([this.rest.latitude, this.rest.longitude], {icon: this.greenIcon}).addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 5
    });
      const markerGroup = leaflet.featureGroup();
      const marker: any = leaflet.marker([this.c.latitude_del, this.c.longitude_del]);
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
  }
  countPriseProd(p1) {
    let x = 0;

    x = x + p1.price * p1.count;
    for ( const p of p1.extraCharge) {
      x = x + p.price * p.count;
    }
    return x;
  }

    async delete() {
      const alert = await this.alertController.create({
        header: 'Choose to continue!',
        message: 'Are you sure you want to cancel command ?',
        buttons: [
          {
            text: 'Sure',
            handler: async () => {
              if (this.c.state.toLowerCase() == 'audit') {
                this.commandService.deleteCommand(this.c.id).subscribe(data => {
                  console.log(data);
                });
                const toast = await this.toastController.create({
                  message: 'Command has been canceled',
                  duration: 2000,
                  position: "top"
                });
                await toast.present();
                this.view.dismiss(this.c.id, '2');
              } else {
                console.log('No');
              }
            },
          },
          {
            text: 'Cancel'
          }]
      });
      await alert.present();
    }
}
