import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from '@ionic/angular';
import {Family} from '../../../Interfaces/products/family';
import {Product} from '../../../Interfaces/products/product';
import {ProductComponent} from '../../../Componenets/description/product/product.component';
import {Plugins} from '@capacitor/core';
import {StorageService} from '../../../Services/storage/storage.service';
import {AuthService} from '../../../Services/storage/auth/auth.service';
import {Customer} from '../../../Interfaces/customer';
import {CustomerService} from '../../../Services/customerService/customer.service';
const { Storage } = Plugins;
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage  {
  exist: boolean;
  user: Customer;
  sign: any;
data: any;


  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService,
              private customerService: CustomerService,
              private loadingController: LoadingController,
              private auth: AuthService,
              private storageProd: StorageService,
              public alertController: AlertController,
              private router: Router, private modelCltrl: ModalController,
              private navCtrl: NavController,
              private platform: Platform,
              private toastController: ToastController) {
  if (this.router.getCurrentNavigation().extras.state) {
    this.data = this.router.getCurrentNavigation().extras.state;
    console.log(this.data);
  }
  }
  async ionViewDidEnter() {
      /*this.user = await this.authService.getuser();
      this.customerService.updateAccountForEmail(this.user).subscribe(async data => {
        console.log(data);
        this.user = data.response as unknown as Customer;
      });
      await console.log(this.user);
      await this.authService.login(this.user);

      if (this.user.state.toLowerCase() == 'blocked') {
      await this.authService.logout();

      const alert = await this.alertController.create({
          header: 'Warning',
          message: 'You may be blocked !<br>Please try to contact us to get more information <br>application will exit!',
          buttons: ['Ok']
        });
      await alert.present();
      const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
      await loading.present();
      navigator['app'].exitApp();

      } else{*/
        const loading = await this.loadingController.create({
          message: 'Please wait...',
          duration: 2000
        });
        await loading.present();
        this.calPrice();

        console.log('jfjfjfjf');
        console.log(this.exist);
  }
  ionViewWillLeave() {
    this.storageProd.setCard(this.data.products, this.data.count);
  }
  delete(idFam, idSub, idProd) {
    if (idSub === undefined) {
      for (const x in this.data.products) {
        console.log('hello');
        if (idFam === this.data.products[x].id) {
          for (const p in this.data.products[x].products) {
            if (this.data.products[x].products[p].id === idProd && (this.data.products[x].products.length === 1)) {
              this.data.products[x].products = [];
              console.log(this.data.products[x]);
              this.data.products.splice(x, 1);
              this.data.count--;
            } else if (this.data.products[x].products[p].id === idProd && this.data.products[x].products.length !== 1) {
              console.log(this.data.products[x]);
              this.data.products[x].products.splice(p, 1);
              this.data.count--;
            }
          }
        }
      }
    } else {
      console.log('family', idFam, 'sub', idSub, 'prod', idProd);
      for (const x in this.data.products) {
        console.log(this.data.products[x]);
        if (idFam === this.data.products[x].id) {

          for (const subF in this.data.products[x].sub_families) {
            console.log(idSub, this.data.products[x].sub_families[subF].id);
            if (idSub === this.data.products[x].sub_families[subF].id) {
              console.log('hello');
              for (const p in this.data.products[x].sub_families[subF].products) {
                console.log(this.data.products[x].sub_families[subF].products[p].id, idProd);
                // @ts-ignore
                // tslint:disable-next-line:max-line-length
                if (this.data.products[x].sub_families[subF].products[p].id === idProd && this.data.products[x].sub_families[subF].products.length === 1) {
                  this.data.products[x].sub_families[subF].products = [];
                  this.data.count--;
                  console.log(this.data.products[x].sub_families);
                  this.data.products[x].sub_families.splice(subF, 1);
                  if (this.data.products[x].sub_families.length === 0) {
                    this.data.products.splice(x, 1);

                  }
                  return;
                } else {
                  // tslint:disable-next-line:max-line-length
                  if (this.data.products[x].sub_families[subF].products[p].id === idProd && this.data.products[x].sub_families[subF].products.length !== 1) {
                    console.log(this.data.products[x].sub_families[subF].products[p].id, idProd);
                    this.data.products[x].sub_families[subF].products.splice(p, 1);
                    console.log(p);
                    this.data.count--;
                    return;
                  }

                }
              }
            }
          }
        }
      }
    }
  }

   back() {

    if (this.data.user == null) {
       this.router.navigate(['/exploration/product']);
    } else {
      this.router.navigate(['/customer-side-menu/product']);
    }
  }


  async function(fam: Family, sub: Family, p: Product) {
    console.log(this.data);
    console.log(fam);
    let a: Family;
    if (sub === undefined) {
      a = {
        id: fam.id,
        family_id: fam.family_id,
        name: fam.name,
        order_appearance: fam.order_appearance,
        sub_families: undefined,
        products: [],
        subfamily_image: undefined

      };
      for (const f of this.data.allProd) {
        console.log('ffffffff');
        if (fam.id === f.id) {

          for (const prod of f.products) {
            if (p.id === prod.id) {
              a.products.push(prod);
            }
          }
        }
      }

      console.log(a);
    } else {
      a = {
        id: fam.id,
        family_id: fam.family_id,
        name: fam.name,
        order_appearance: fam.order_appearance,
        sub_families: [{
          id: sub.id,
          family_id: sub.family_id,
          name: sub.name,
          order_appearance: sub.order_appearance,
          subfamily_image: sub.subfamily_image,
          products: [{
            family_id: p.family_id,
            id: p.id,
            name: p.name,
            designation: p.designation,
            order_app: p.order_app,
            product_image: p.product_image,
            extraCharge: [],
            price: p.price,
            count: p.count
          }],
          sub_families: undefined
        }],
        subfamily_image: undefined,
        products: []

      };
      for (const f of this.data.allProd) {
        console.log('ffffffff');
        if (fam.id === f.id) {

          for (const subF of f.sub_families) {
            if (sub.id === subF.id) {
              for (const p1 of subF.products) {
                if (p.id === p1.id) {
                  for (const e of p1.extraCharge) {
                    console.log(e);
                    a.sub_families[0].products[0].extraCharge.push(e);
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log('a', a);
    const modal1 = await this.modelCltrl.create({
      component: ProductComponent,
      componentProps: {
        product: a,
        card: this.data.products,
        exist: true
      }

    });
    await modal1.present();
  }
  async presentToast(c: string) {
    const toast = await this.toastController.create({
      message: c,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  countPriseProd(p1) {
    let x = 0;
    console.log(p1);
    x = x + p1.price * p1.count;
    for ( const p of p1.extraCharge) {
      x = x + p.price * p.count;
      console.log(x);
    }
    console.log(x);
    return x;
  }

  calPrice() {
    let p = 0;
    console.log('xxxx');

    for (const f of this.data.products) {
      // tslint:disable-next-line:triple-equals
      if (f.sub_families.length == 0) {
        for (const p1 of f.products) {
          p = p + this.countPriseProd(p1);
        }
      } else {
        for (const sub of f.sub_families) {
          for (const p1 of sub.products) {
            p = p + this.countPriseProd(p1);
          }
        }
      }
    }
    return p;
  }
  async command() {
    console.log('ffffffffff', this.data.products);
    const alert = await this.alertController.create({
      header: 'Choose to continue!',
      message: 'Choose your type of delivery',
      buttons: [
         {
          text: 'Delivery',
          handler: () => {
            const navigationExtras: NavigationExtras = {
                state: {
                  allProd: this.data.products,
                  price: this.calPrice(),
                  delivery: '1'
                }

              };

            this.router.navigate(['/customer-side-menu/command'], navigationExtras);
          }
          },
        {
          text: 'Do not delivery',
          handler: () => {
            const navigationExtras: NavigationExtras = {state: {
                allProd: this.data.products,
                price: this.calPrice(),
                delivery: '2'
              }
            };

            this.router.navigate(['/customer-side-menu/command'], navigationExtras);
          }
        }
      ]
    });

    await alert.present();
  }
async logIn() {
  this.storageProd.setCard(this.data.products, this.data.count);
  this.router.navigate(['/log-in']);

}

}
