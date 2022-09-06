import { OnInit } from '@angular/core';
import {AlertController, LoadingController, Platform, ToastController} from '@ionic/angular';
import {NavigationExtras, Router} from '@angular/router';
import leaflet from 'leaflet';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Customer} from '../../../../Interfaces/customer';

import { map } from 'rxjs/operators';
import {AuthService} from '../../../../Services/storage/auth/auth.service';
import {Command} from '../../../../Interfaces/Command/command';
import {CommandService} from '../../../../Services/commandService/command-service.service';
import {StorageService} from '../../../../Services/storage/storage.service';
import {Restaurant} from '../../../../Interfaces/restaurant/Restaurant';
import {RestaurantService} from '../../../../app/Services/restaurant.service';
import {CustomerService} from '../../../../Services/customerService/customer.service';


@Component({
  selector: 'app-command',
  templateUrl: './command.page.html',
  styleUrls: ['./command.page.scss'],
})
export class CommandPage implements OnInit {
  map: any;
     greenIcon = leaflet.icon({
        iconUrl: '../../../../../assets/img/restaurant.png'
        // shadowUrl: 'leaf-shadow.png'
    });
  myDate: Date = new Date();
  date: string;
  data: any;
  @ViewChild('map', {static: true}) mapContainer: ElementRef;
  eLatitude: number;
   eLongitude: number;

  constructor(public plt: Platform,
              public router: Router,
              private auth: AuthService,
              private commandService: CommandService,
              private loadingController: LoadingController,
              private commandStorage: StorageService,
              private restaurantService: RestaurantService,
              private toastController: ToastController,
              private authService: AuthService,
              private customerService: CustomerService,
              private alertController: AlertController,
              private prodStorage: StorageService

              ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
    }
  }
  rest: Restaurant;
  x=false;
  cust: Customer;
  result: boolean;
  ngOnInit() {
  }
  back() {
    this.router.navigate(['/customer-side-menu/list-product']);
  }

  async ionViewDidEnter() {

      this.cust = await this.authService.getuser();
      console.log(this.cust);
      let loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
      });
      await loading.present;
      this.cust = (await this.customerService.updateAccountForEmail(this.cust).toPromise()).response as unknown as Customer ;
      // await this.auth.login(data.response as unknown as Customer);
      loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
      });
      await loading.present();
      await this.auth.login(this.cust);
      this.restaurantService.getRestaurant().subscribe(data => {
              this.rest = data;
          });
      this.myDate = new Date();
      this.cust = await this.auth.getuser();
      loading = await this.loadingController.create({
              message: 'Please wait...',
              duration: 2000
          });
      await loading.present();
      await loading.onDidDismiss();

      this.date = this.myDate.toISOString();
      console.log('date:', this.date);
          // this.date =  myDate.getDate().toString() + '/' + (myDate.getMonth() + 1).toString() + '/' + myDate.getFullYear().toString();
      console.log('xxxxxx');

      this.loadMap();
  }
    loadMap() {
      this.map = leaflet.map('map').fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attributions: 'www.tphangout.com',
       maxZoom: 18,
     }).addTo(this.map);
      leaflet.Circle.include({
             contains(latLng) {
                return this.getLatLng().distanceTo(latLng) <= this.getRadius();
            }
        });
      const circle = leaflet.circle([this.rest.latitude, this.rest.longitude], {
          color: 'green',
           fillOpacity: 0.1,
           radius: this.rest.radius
   }).addTo(this.map);
      leaflet.marker([this.rest.latitude, this.rest.longitude], {icon: this.greenIcon}).addTo(this.map);

      circle.bindPopup('Delivery will be in this green Circle .').openPopup();
      this.map.locate({
       setView: true,
       maxZoom: 5
     }).on('locationfound', async (e) => {
       this.eLatitude = e.latitude;
       this.eLongitude = e.longitude;
       console.log(e.latitude, e.longitude);
       const markerGroup = leaflet.featureGroup();
       console.log(e);
       if (this.data.delivery == '1') {
           console.log('hfhfhfhfhfh');
           const marker: any = leaflet.marker([e.latitude, e.longitude], {
               draggable: true
           }).on('drag', (x) => {
               this.result = (circle.contains(marker.getLatLng()));
               console.log(marker.getLatLng());
               this.eLongitude = x.latlng.lng;
               this.eLatitude = x.latlng.lat;
           }).on('add', (p) => {
               this.result = (circle.contains(marker.getLatLng()));
           });
           markerGroup.addLayer(marker);
           this.map.addLayer(markerGroup);
       } else{
           console.log('hfhfhfhfhfh');
           const marker: any = leaflet.marker([e.latitude, e.longitude], {
               draggable: false
           }).on('drag', (x) => {
               this.result = (circle.contains(marker.getLatLng()));
               console.log(marker.getLatLng());
               this.eLongitude = x.latlng.lng;
               this.eLatitude = x.latlng.lat;
           }).on('add', (p) => {
               this.result = (circle.contains(marker.getLatLng()));
           });
           markerGroup.addLayer(marker);
           this.map.addLayer(markerGroup);
       }
          this.x = true;
     }).on('locationerror', (err) => {
       this.presentToast('Something happen with location try to connect to network and come back ');

     });
   }
    async presentToast(c: string) {
        const toast = await this.toastController.create({
            message: c,
            position: 'top',
            duration: 2000
        });
        toast.present();
    }
   async command() {
       const alert = await this.alertController.create({
           header: 'Choose to continue!',
           message: 'Are you sure you want to command ?',
           buttons: [
               {
                   text: 'Sure',
                   handler: async () => {
                       this.cust = await this.authService.getuser();
                       console.log(this.cust);
                       const loading1 = await this.loadingController.create({
                           message: 'Please wait...',
                           duration: 2000
                       });
                       await loading1.present;
                       this.cust = (await this.customerService.updateAccountForEmail(this.cust).toPromise()).response as unknown as Customer;
                       console.log(this.cust);
                       if (this.result == false) {
                           await this.presentToast('Please make sure that your delivery position is inside the green circle.');
                       } else {
                           if (this.cust.state.toLowerCase() == 'active') {

                               console.log(this.eLongitude, this.eLatitude);
                               const c: Command = {
                                   id: undefined,
                                   date_command: this.date,
                                   state: 'audit',
                                   latitude_del: this.eLatitude,
                                   longitude_del: this.eLongitude,
                                   customer_id: this.cust.id,
                                   products: this.data.allProd,
                                   command_type: 'delivery',
                                   total_price: this.data.price + 2
                               };
                               if (this.data.delivery == '2') {
                                   c.command_type = 'do not';
                               }
                               console.log(this.data.allProd);
                               console.log(c);
                               this.commandService.create(c).subscribe(data => {
                                   console.log(data);
                               });

                               await this.commandStorage.setCommand();
                               const loading = await this.loadingController.create({
                                   message: 'Please wait...',
                                   duration: 2000
                               });
                               await loading.present();

                               await loading.onDidDismiss();
                               await this.presentToast('your command has been launched .<br>Please check your command history to get more information.');
                               await this.router.navigate(['/customer-side-menu/product']);
                           } else {
                               this.cust = (await this.customerService.updateAccountForEmail(this.cust).toPromise()).response as unknown as Customer;
                               const alert = await this.alertController.create({
                                   header: 'Warning',
                                   message: 'You may be blocked !<br>Please try to contact us to get more information <br>application will exit!',
                                   buttons: ['Ok']
                               });
                               await alert.present();
                               await this.authService.logout();
                               // await this.router.navigate(['']);
                               await this.prodStorage.setCard([], 0);
                               navigator['app'].exitApp();
                           }
                       }
                   }
   },
               {
                   text: 'No',
               }]
   });
       alert.present();
   }
       countPriseProd(p1) {
           let x = 0;

           x = x + p1.price * p1.count;
           for (const p of p1.extraCharge) {
               x = x + p.price * p.count;
           }
           return x;
       }

}
