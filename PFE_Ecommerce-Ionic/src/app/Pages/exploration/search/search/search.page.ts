import { Component, OnInit } from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';
import {Product} from '../../../../Interfaces/products/product';
import {Family} from '../../../../Interfaces/products/family';
import {ProductComponent} from '../../../../Componenets/description/product/product.component';
import {ModalController} from '@ionic/angular';
import {StorageService} from '../../../../Services/storage/storage.service';
import {AuthService} from '../../../../Services/storage/auth/auth.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  data;
  prodList: Array<Product> = [];
  x: Array<Family> = [];
  count = 0;
  val = '';

  constructor(private authService: AuthService, private prodStorage: StorageService, private router: Router, private modelCltrl: ModalController) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.data = this.router.getCurrentNavigation().extras.state;
      console.log(this.data);
      console.log(this.prodList);
    }

  }

  ngOnInit() {

  }
  async ionViewWillLeave() {
    await this.prodStorage.setCard(this.data.products, this.data.count);
  }
  ionViewDidEnter() {

  }

  handleInput(event) {

    this.prodList = [];
    this.initialiszeProduct();
    this.count++;
    this.val = event.target.value;
    if (this.val && this.val.trim() !== '') {
      this.prodList = this.prodList.filter((x) => {
        return (x.name.toLowerCase().indexOf(this.val.toLowerCase()) > -1);
      });
    }

  }

  initialiszeProduct() {
    for (const f of this.data.allProd) {
      if (f.sub_families.length === 0) {
        for (const p of f.products) {
          this.prodList.push(p);
        }
      } else {
        for (const sub of f.sub_families) {
          for (const p of sub.products) {
            this.prodList.push(p);
          }
        }
      }
    }
    console.log(this.prodList);
  }

  async description(p: Product) {
    let fam: Family;
    for (const f of this.data.allProd) {
      if (f.sub_families.length === 0) {
        if (f.id == p.family_id) {
          fam = {
            id: f.id,
            name: f.name,
            order_appearance: f.order_appearance,
            subfamily_image: f.subfamily_image,
            sub_families: undefined,
            products: [],
            family_id: f.family_id

          };
          console.log(fam);
          for (const p1 of f.products) {
            if (p1.id == p.id) {
              fam.products.push(p1);
              console.log('this is the product without sub');


            }
          }
        }
      } else {
        for (const sub of f.sub_families) {

          // tslint:disable-next-line:triple-equals
          if (sub.id == p.family_id) {
            fam = {
              id: f.id,
              family_id: f.family_id,
              name: f.name,
              order_appearance: f.order_appearance,
              subfamily_image: f.subfamily_image,
              sub_families: [{
                id: sub.id,
                name: sub.name,
                order_appearance: sub.order_appearance,
                subfamily_image: sub.subfamily_image,
                sub_families: [],
                products: [],
                family_id: sub.family_id
              }],
              products: []
            };
            for (const p1 of sub.products) {
              if (p1.id == p.id) {
                fam.sub_families[0].products.push(p1);
              }
            }
          }

        }

      }

    }
    console.log(fam);
    const modal = await this.modelCltrl.create({
      component: ProductComponent,
      componentProps: {
        product: fam,
        card: this.data.products,
        exist: this.findProd(fam)
      }
    });
    modal.onDidDismiss().then(data => {
      // console.log(this.items)
      if (data.data !== undefined && data.role === undefined) {
        console.log('fffff', data);
        this.addProduct(data);


      } else if (data.role === '1') {
        console.log('ffff', data.data.products [0].id);
      } else if (data.role === '2') {
        console.log(data.data);
        this.modifier(data.data);

      }


      // this.card = this.card.filter(d=> d.products.);


    });
    await modal.present();
  }
  findProd(d: Family) {
    if (this.data.products.length === 0) {
      return false;
    } else {
      for (const f of this.data.products) {
        if (f.id == d.id) {
          if (f.sub_families.length !== 0) {
            for (const sub of f.sub_families) {
              if (sub.id === d.sub_families[0].id) {
                for (const p of sub.products) {
                  if (p.id == d.sub_families[0].products[0].id) {
                    return true;
                  }
                }
              }
            }
          } else {
            for (const p of f.products) {
              if (p.id == d.products[0].id) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }
    /*if (sub === undefined) {
      for (const p of this.data.products) {
        if (cat === p.id) {
          for (const p1 of p.products) {
            // console.log('ppppp',p1)
            if (id === p1.id) {

              return true;
            }
          }
        }
      }
    } else {
      for (const p of this.data.products) {
        if (cat === p.id) {
          for (const sub1 of p.sub_families) {
            if (sub1.id === sub) {
              for (const p1 of sub1.products) {
                if (id === p1.id) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
    return false;*/
  }
  modifier(data: Family) {
    for (const f of this.data.products) {
      if (f.id === data.id) {
        for (let p of f.products) {
          if (p.id === data.products[0].id) {
            p = data.products[0];
          }
        }
      }
    }
  }
  addProduct(d) {
    let x = 0;
    let prod: Family;
    console.log('dddddd', d);
    if (d.data.sub_families.length === 0) {
      prod = {
        family_id: d.data.family_id,
        id: d.data.id,
        name: d.data.name,
        order_appearance: d.data.order_appearance,
        subfamily_image: d.data.subfamily_image,
        products: [{
          family_id: d.data.products[0].family_id,
          id: d.data.products[0].id,
          name: d.data.products[0].name,
          designation: d.data.products[0].designation,
          order_app: d.data.products[0].order_appearance,
          product_image: d.data.products[0].product_image,
          extraCharge: [],
          price: d.data.products[0].price,
          count: d.data.products[0].count
        }],
        sub_families: []
      };


      for (const e of d.data.products[0].extraCharge) {
        console.log(e);
        prod.products[0].extraCharge.push(e);
      }
      console.log('My Card (addProduct)', this.data.products);
      console.log('product Selected', prod);
      console.log('fammmm',this.data.fam)

      if (this.data.products.length === 0) {
        console.log(this.count);
        this.data.products.push(prod);
        console.log(this.count);
        this.data.count++;
        return;
      } else {
        for (const fam of this.data.products) {
          // tslint:disable-next-line:triple-equals
          if (fam.id == prod.id) {
            fam.products.push(prod.products[0]);
            console.log('got it', this.data.products);
            console.log(this.count);
            this.data.count++;
            console.log(this.count);
            return;
          }
        }
        this.data.products.push(prod);
        console.log(this.count);
        this.data.count++;
        console.log(this.count);
        console.log('new cat', this.data.products);
      }
    } else {
      prod = {
        id: d.data.id,
        family_id: d.data.family_id,
        name: d.data.name,
        order_appearance: d.data.order_appearance,
        subfamily_image: d.data.subfamily_image,
        products: [],
        sub_families: [{
          id: d.data.sub_families[0].id,
          family_id: d.data.sub_families[0].family_id,
          name: d.data.sub_families[0].name,
          order_appearance: d.data.sub_families[0].order_appearance,
          subfamily_image: d.data.sub_families[0].subfamily_image,
          products: [{
            family_id: d.data.sub_families[0].products[0].family_id,
            id: d.data.sub_families[0].products[0].id,
            name: d.data.sub_families[0].products[0].name,
            designation: d.data.sub_families[0].products[0].designation,
            order_app: d.data.sub_families[0].products[0].order_app,
            product_image: d.data.sub_families[0].products[0].product_image,
            extraCharge: [],
            price: d.data.sub_families[0].products[0].price,
            count: d.data.sub_families[0].products[0].count
          }],
          sub_families: undefined
        }]
      };


      for (const e of d.data.sub_families[0].products[0].extraCharge) {
        prod.sub_families[0].products[0].extraCharge.push(e);
      }
      console.log('My Card (addProduct)', this.data.products);
      console.log('product Selected', prod);

      if (this.data.products.length === 0) {

        this.data.products.push(prod);
        console.log(this.count);
        this.data.count++;
        console.log(this.count);
        return;
      } else {
        console.log(prod, this.data.product);
        for (const fam in this.data.products) {
          // tslint:disable-next-line:triple-equals

          if (this.data.products[fam].id == prod.id) {
            console.log('donnnnnnnneeee')
            for (const p in this.data.products[fam].sub_families) {
              if (this.data.products[fam].sub_families[p].id === prod.sub_families[0].id) {
                this.data.products[fam].sub_families[p].products.push(prod.sub_families[0].products[0]);
                this.data.count++;
                return;
              }
            }
            this.data.products[fam].sub_families.push(prod.sub_families[0]);
            x = 1;
            console.log(this.count);
            this.data.count++;
            console.log(this.count);
            return;
          }
        }
        if (x === 0) {
          this.data.products.push(prod);
          console.log(this.count);
          this.data.count++;
          console.log(this.count);
          console.log('new cat', this.data.products);
        }
      }
    }
    console.log('fffff', this.data.products);
  }
  verifie(p) {
    if (this.data.products.length == 0) {
      console.log(this.data.products);
      return 0 ;
    } else {
      for (const x of this.data.products) {
        if (x.sub_families.length == 0) {
          for ( const p1 of x.products) {
            if (p.id == p1.id ) {
              console.log(p);
              console.log(p1);
              return p1.count ;
            }
          }
        } else {
          for (const sub of x.sub_families) {
            for (const p1 of sub.products) {
              if (p1.id == p.id) {
                return p1.count ;
              }
            }
          }
        }
      }
    }
    return 0;
  }


  back() {
    if (this.authService.isAuthentificated()) {
      this.router.navigate(['customer-side-menu/product']);
    } else {
      this.router.navigate(['exploration/product']);
    }
  }
}

