import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {User} from '../../../../../Interfaces/users/user';
import {EventsService} from '../../../../../Services/events/events.service';
import {Customer} from '../../../../../Interfaces/customer';
import {Plugins} from '@capacitor/core';
import {AuthService} from '../../../../../Services/storage/auth/auth.service';
import {LoadingController} from '@ionic/angular';
import {StorageService} from "../../../../../Services/storage/storage.service";
import {RestaurantService} from "../../../../../app/Services/restaurant.service";
import {Restaurant} from "../../../../../Interfaces/restaurant/Restaurant";
import {CustomerService} from "../../../../../Services/customerService/customer.service";
const { Storage } = Plugins;


const { Geolocation } = Plugins;

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {
  public selectedIndex = 0;
  user: Customer;
  public appPages = [
    {
      title: 'Menu',
      url: '/customer-side-menu/product',
      icon: 'reader-outline'
    },
      {
          title: 'Command history',
          url: '/customer-side-menu/command-history',
          icon: 'pricetags-outline'
      },
      {
          title: 'Account',
          url: '/customer-side-menu/update',
          icon: 'create-outline'
      },


  ];
  restaurant: Restaurant;
    // tslint:disable-next-line:max-line-length
  constructor(private restaurantService: RestaurantService,
              private loadingController: LoadingController,
              private router: Router, private auth: AuthService,
              private prodStorage: StorageService,
              private customerService: CustomerService) {
  }
  ionViewDidEnter() {
      console.log('bilel saiden');
  }
  async ngOnInit() {
      this.restaurantService.getRestaurant().subscribe(data => {
          this.restaurant = data;
          console.log(this.restaurant);
      });
      this.user = {
          id: undefined,
          name: undefined,
          password: undefined,
          email: undefined,
          state: undefined,
          type: undefined,
          phone: undefined,
          latitude: undefined,
          longitude: undefined
      };
      console.log(await this.auth.getuser());
      this.user = await this.auth.getuser();
      console.log(this.user);
      const loading = await this.loadingController.create({
              message: 'Please wait...',
              duration: 2000
          });
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current', coordinates);
      await loading.present();

      await loading.onDidDismiss();
      this.user.longitude = coordinates.coords.longitude;
      this.user.latitude = coordinates.coords.latitude;
      console.log(await this.customerService.addPos(this.user).toPromise());
      this.auth.login(this.user);
  }
    async removeItem() {
       await this.auth.logout();
       await this.prodStorage.setCard([], 0);
    }

    async sendCustomer(p, i) {
        this.selectedIndex = i;
        console.log(this.user);
        this.customerService.updateAccountForEmail(this.user).subscribe(async data => {
            console.log(data);
            this.user = data.response as unknown as Customer;
            await this.auth.login(data.response as unknown as Customer);
        });
        const loading = await this.loadingController.create({
            message: 'Please wait...',
            duration: 2000
        });
        await loading.present();

        await loading.onDidDismiss();
        const navigationExtras: NavigationExtras = {
            state: {
                user: this.user
            }
        };
        console.log(this.user);
        this.router.navigate([p.url], navigationExtras);
    }
}



