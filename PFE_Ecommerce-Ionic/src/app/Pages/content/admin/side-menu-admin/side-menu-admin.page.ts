import { Component, OnInit } from '@angular/core';
import {User} from "../../../../Interfaces/users/user";
import {NavigationExtras, Router} from "@angular/router";
import {RestaurantService} from "../../../../app/Services/restaurant.service";
import {LoadingController} from "@ionic/angular";
import {AuthService} from "../../../../Services/storage/auth/auth.service";
import {StorageService} from "../../../../Services/storage/storage.service";
import {Restaurant} from "../../../../Interfaces/restaurant/Restaurant";

@Component({
  selector: 'app-side-menu-admin',
  templateUrl: './side-menu-admin.page.html',
  styleUrls: ['./side-menu-admin.page.scss'],
})
export class SideMenuAdminPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Customers',
      url: '/side-menu-admin/block',
      icon: 'Menu'
    }];
  admin: User;
  restaurant: Restaurant;
  constructor(private restaurantService: RestaurantService,
              private loadingController: LoadingController,
              private router: Router, private auth: AuthService,
              private prodStorage: StorageService) { }

  async ngOnInit() {
    this.restaurantService.getRestaurant().subscribe(data => {
      this.restaurant = data;
      console.log(this.restaurant);
    });
    this.admin = {
      id: undefined,
      name: undefined,
      password: undefined,
      email: undefined,
      type: undefined,
      phone: undefined
    };
    console.log(await this.auth.getuser());
    this.admin = await this.auth.getuser();
    console.log(this.admin);
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    await loading.onDidDismiss();

  }
  async removeItem() {
    this.auth.logout();
    this.prodStorage.setCard([], 0);
  }

  sendAdmin(p, i) {
    this.selectedIndex = i;
    const navigationExtras: NavigationExtras = {
      state: {
        user: this.admin
      }
    };
    console.log(this.admin);
    this.router.navigate([p.url], navigationExtras);
  }

}
