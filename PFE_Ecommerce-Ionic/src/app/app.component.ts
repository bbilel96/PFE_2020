import {Component, ViewChild} from '@angular/core';

import {IonRouterOutlet, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './Services/storage/auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
@ViewChild(IonRouterOutlet, {static: false}) routerOutlet: IonRouterOutlet;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      let check;
      let user ;
      this.authService.authentificationState.subscribe(state => {
       check = state;
    });

      user = await this.authService.getuser();
      console.log(check);
      if (check) {
        console.log(user);
        if (user.type == 'customer') {
          console.log('hfhfhfhfh');
          this.router.navigate(['customer-side-menu/product']);
        } else
          if (user.type == 'admin') {
          this.router.navigate(['/side-menu-admin/block']);

        }
      } else {
        this.router.navigate(['']);
      }
    });
    this.platform.backButton.subscribeWithPriority(0, async () => {
      if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        this.routerOutlet.pop();
      } else
        if (this.router.url === '/customer-side-menu/product') {
          console.log('navigate');
          this.router.navigate(['/customer-side-menu/product']);
        }

    });
  }
}
