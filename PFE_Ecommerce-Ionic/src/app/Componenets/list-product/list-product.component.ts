import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Family } from 'src/app/Interfaces/products/family';
import { ProductComponent } from '../description/product/product.component';
import {Product} from '../../Interfaces/products/product';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
count: number = this.navParams.data.count;
  sign: any;
  constructor(private router: Router, private modelCltrl: ModalController, private view: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    console.log('product list', this.navParams.data);
    this.calPrice();
  }

  delete(idFam, idSub, idProd) {
    if (idSub === undefined) {
    for (const x in this.navParams.data.products) {
      console.log('hello');
      if (idFam === this.navParams.data.products[x].id) {
        for (const p in this.navParams.data.products[x].products) {
          if (this.navParams.data.products[x].products[p].id === idProd &&  (this.navParams.data.products[x].products.length === 1)) {
            this.navParams.data.products[x].products = [];
            console.log(this.navParams.data.products[x]);
            this.navParams.data.products.splice(x, 1);
            this.count--;
          } else
            if(this.navParams.data.products[x].products[p].id === idProd && this.navParams.data.products[x].products.length !== 1){
            console.log(this.navParams.data.products[x]);
            this.navParams.data.products[x].products.splice(p, 1);
              this.count--;
            }
          }
        }
      }
    } else {
        console.log('family', idFam, 'sub', idSub, 'prod', idProd);
        for (const x in this.navParams.data.products) {
        console.log(this.navParams.data.products[x]);
        if (idFam === this.navParams.data.products[x].id) {

          for (const subF in this.navParams.data.products[x].sub_families) {
            console.log(idSub, this.navParams.data.products[x].sub_families[subF].id);
            if (idSub === this.navParams.data.products[x].sub_families[subF].id) {
              console.log('hello');
              for (const p in this.navParams.data.products[x].sub_families[subF].products) {
                console.log(this.navParams.data.products[x].sub_families[subF].products[p].id, idProd)
                // @ts-ignore
                // tslint:disable-next-line:max-line-length
                if (this.navParams.data.products[x].sub_families[subF].products[p].id === idProd && this.navParams.data.products[x].sub_families[subF].products.length === 1) {
                  this.navParams.data.products[x].sub_families[subF].products = [];
                  this.count--;
                  console.log(this.navParams.data.products[x].sub_families);
                  this.navParams.data.products[x].sub_families.splice(subF, 1);
                  if (this.navParams.data.products[x].sub_families.length === 0) {
                    this.navParams.data.products.splice(x, 1);

                  }
                  return;
                } else {
                  // tslint:disable-next-line:max-line-length
                  if (this.navParams.data.products[x].sub_families[subF].products[p].id === idProd && this.navParams.data.products[x].sub_families[subF].products.length !== 1) {
                    console.log(this.navParams.data.products[x].sub_families[subF].products[p].id, idProd);
                    this.navParams.data.products[x].sub_families[subF].products.splice(p, 1);
                    console.log(p);
                    this.count--;
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

  }
    async function(fam: Family, sub: Family, p: Product) {
    console.log(this.navParams.data);
    console.log(fam);
    let a: Family;
    if (sub === undefined) {
        a = {
          id: fam.id,
          name: fam.name,
          family_id: fam.family_id,
          order_appearance: fam.order_appearance,
          sub_families: undefined,
          products: [],
          subfamily_image: undefined

        };
        for (const f of this.navParams.data.allProd) {
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
            family_id:sub.family_id,
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
      for (const f of this.navParams.data.allProd) {
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
          card: this.navParams.data.products,
          exist: true
        }

    });
    await modal1.present();
    }
  calPrice() {
    let p = 0;
    this.navParams.data.products.forEach(element => {
      element.products.forEach(x => {
        p = p + x.price * x.count;
      });
    });
    return p;
  }



}


