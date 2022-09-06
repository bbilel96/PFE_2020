import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from '../../Services/events/events.service';

import {User} from '../../Interfaces/users/user';
import {AuthService} from '../../Services/storage/auth/auth.service';
import {RestaurantService} from "../../app/Services/restaurant.service";
import {Restaurant} from "../../Interfaces/restaurant/Restaurant";


@Component({
  selector: 'app-exploration',
  templateUrl: './exploration.page.html',
  styleUrls: ['./exploration.page.scss'],
})
export class ExplorationPage implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Menu',
      url: '/exploration/product',
      icon: 'Menu'
    },
    {
      title: 'Sign in',
      url: '/log-in',
      icon: 'compte'
    }

  ];
  restaurant: Restaurant;


  constructor(private auth: AuthService,private restaurantService: RestaurantService) {
console.log('jdjfjfjfjfjfjf');
  }
  user: User;



  ngOnInit() {
    this.restaurantService.getRestaurant().subscribe(data => {
      this.restaurant = data;
      console.log(this.restaurant);
    });
    this.user = {
      id: undefined,
      name: 'user',
      email: undefined,
      password: undefined,
      phone: undefined,
      type: undefined
    };

  }
}
