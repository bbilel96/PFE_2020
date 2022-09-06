import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../Interfaces/products/product';
import {Family} from '../../../Interfaces/products/family';
import {NavParams, ModalController, Platform} from '@ionic/angular';
import { ChildActivationStart } from '@angular/router';
import { ProductPageModule } from 'src/app/Pages/content/product/product.module';
import { ExtraCharge } from 'src/app/Interfaces/products/extra-charge';
import { ThrowStmt } from '@angular/compiler';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    product: Product;
    rangeVal: string;
    x: any;
    cardC: Array<Family> = [];
    valid: boolean = null;
    check1: any;
   checks: Array<any> = [];
   c = 1;
   price = 0;
    range: any;
    image: string;




    constructor(private view: ModalController, private navParams: NavParams) {
        console.log(this.navParams.data.product);
        this.cardC = this.navParams.data.card;
    }
    ngOnInit() {
        console.log('hfhfhfhfhfhfh', this.navParams);
        console.log(this.image);
        console.log('exist', this.navParams.data.exist);
        if (this.navParams.data.product.sub_families === undefined) {
            this.image = this.navParams.data.product.products[0].product_image;
            for (const e of this.navParams.data.product.products[0].extraCharge) {
            this.check1 = { id: e.id,
                            name: e.name,
                            order_app: e.order_app,
                            type: e.type,
                            price: e.price,
                            checked: false,
                            count: 1};
            this.checks.push(this.check1);
            }
            console.log('helloe', this.checks, this.cardC);
            if (this.cardC !== null) {
                for (const f of this.cardC) {
                    if (f.id === this.navParams.data.product.id) {
                        for (const p of f.products) {
                            if (p.id === this.navParams.data.product.products[0].id) {
                                console.log(p.count);
                                this.c = p.count;
                                if (p.extraCharge.length !== 0) {
                                    for (const e of p.extraCharge) {
                                        for (const c1 of this.checks) {
                                            if (c1.id === e.id) {
                                                c1.count = e.count;
                                                c1.checked = true;
                                                console.log(e.count);


                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
    } else {
            this.image = this.navParams.data.product.sub_families[0].products[0].product_image;
            for (const e of this.navParams.data.product.sub_families[0].products[0].extraCharge) {
                console.log(e);
                this.check1 = { id: e.id,
                    name: e.name,
                    order_app: e.order_app,
                    type: e.type,
                    price: e.price,
                    count: 1,
                    checked: false};
                this.checks.push(this.check1);
            }
            console.log('helloe', this.checks, this.cardC);
            if (this.cardC !== null) {
                for (const f of this.cardC) {
                    if (f.id === this.navParams.data.product.id) {
                        for (const sub of f.sub_families) {
                            if (sub.id === this.navParams.data.product.sub_families[0].id ) {
                                for (const p of sub.products) {
                                if (p.id === this.navParams.data.product.sub_families[0].products[0].id) {
                                console.log(this.navParams.data.product.sub_families[0].products[0].id);
                                this.c = p.count;
                                if (p.extraCharge.length !== 0) {
                                    for (const e of p.extraCharge) {
                                        for (const c1 of this.checks) {
                                            if (c1.id === e.id) {
                                                c1.count = e.count;
                                                c1.checked = true;
                                                console.log(e.count);
                                            }
                                        }
                                    }
                                    }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

}
prodExist(c: Array<Family>, p: Family) {
    for (const c1 of c) {

        if (c1.name === p.name) {
            for (const p1 of c1.products) {
               if (p.products[0].id === p1.id) {
                return false;
               }
            }
        }
    }
    return true;
}
modifie(d) {
    console.log('x', d, this.cardC);
    if (d.sub_families === undefined) {
    for (const x of this.cardC) {
        if (d.id === x.id) {


            for (const i in x.products) {
                console.log('dfff', x.products[i]);
                console.log('fkfjfjf', d);
                // tslint:disable-next-line: triple-equals
                if (x.products[i].id == d.products[0].id) {
                    console.log('hello world');
                    this.updateExtraCharge(x.products[i]);
                    x.products[i].count = this.c;
                    console.log(x.products[i]);

                }
            }
            this.view.dismiss(x, '2');
        }
    }
} else {
    for (const x of this.cardC) {
        if (d.id === x.id) {
            for (const sub of x.sub_families) {
                if (sub.id === sub.id) {
                    // tslint:disable-next-line:forin
                    for (const i in sub.products) {
                        console.log('dfff', sub.products[i]);
                        console.log('fkfjfjf', d);
                        // tslint:disable-next-line: triple-equals
                        if (sub.products[i].id === d.sub_families[0].products[0].id) {
                            console.log('hello world');
                            this.updateExtraCharge(sub.products[i]);
                            sub.products[i].count = this.c;
                            console.log(sub.products[i]);
                            this.view.dismiss(sub, '2');
                        }
                    }
                }
            }
        }
    }
}
    this.view.dismiss(undefined, '2');
    }
updateExtraCharge(data: Product) {
    data.extraCharge = [];
    console.log(data.extraCharge);
    for (const c of this.checks) {
        // tslint:disable-next-line:triple-equals
        if (c.checked == true) {
      const check: ExtraCharge = {   id: c.id,
         name : c.name,
         order_app: c.order_app,
         product_image: undefined,
         type: c.type,
         price: c.price,
          count: c.count

      };
      data.extraCharge.push(check);
      console.log('jajaj');

     }

}
    return;


}
calculPrice() {
   let x = 0;
   for (const p of this.checks) {
        if (p.checked === true) {
        x = x + p.price * p.count;
        console.log(p.count);
        }
    }
   if (this.navParams.data.product.sub_families === undefined) {
       return (this.navParams.data.product.products[0].price ) * this.c + x;
   } else {
       return (this.navParams.data.product.sub_families[0].products[0].price) * this.c + x;
   }

}
checkBox(x) {
 console.log(x.count);
 if (!x.checked) {
    x.count = 0;
    console.log( x.count);
 } else {
     if (x.count == 0) {
         x.count = 1;
     }
 }

}




    back() {

        this.view.dismiss();
    }
    buy(x) {
        console.log(x);
        let a: Family;
        let check: ExtraCharge;

        if (x.product.sub_families === undefined) {
            a = {
            id: x.product.id,
            name: x.product.name,
                family_id:x.product.family_id,
            order_appearance: x.product.order_app,
            subfamily_image: undefined,
            products: [{
                family_id: x.product.products[0].family_id,
                id: x.product.products[0].id,
                name: x.product.products[0].name,
                designation: x.product.products[0].designation,
                order_app: x.product.products[0].order_appearance,
                product_image: x.product.products[0].product_image,
                extraCharge: [],
                price: x.product.products[0].price,
                count: this.c
            }],
            sub_families: []
        };
            for (const c of this.checks) {
            if (c.checked === true) {
             check = {   id: c.id,
             name : c.name,
             price: c.price,
             order_app: c.order_app,
             product_image: undefined,
             type: c.type,
             count: c.count
          };
             console.log(a.products);
             a.products[0].extraCharge.push(check);
        }
    }
            console.log(a.products[0]);
    } else {
     a = {
            id: x.product.id,
            name: x.product.name,
         family_id: x.product.family_id,
            order_appearance: x.product.order_app,
            subfamily_image: undefined,
            products: x.product.products,
            sub_families: [{id: x.product.sub_families[0].id,
                            family_id:x.product.family_id,
                            name: x.product.sub_families[0].name,
                            order_appearance: x.product.sub_families[0].order_appearance,
                            sub_families: undefined,
                            subfamily_image: undefined,
                            products: [{
                                        family_id: x.product.sub_families[0].products[0].family_id,
                                        id: x.product.sub_families[0].products[0].id,
                                        name: x.product.sub_families[0].products[0].name,
                                        designation: x.product.sub_families[0].products[0].designation,
                                        order_app: x.product.sub_families[0].products[0].order_appearance,
                                        product_image: x.product.sub_families[0].products[0].product_image,
                                        extraCharge: [],
                                        price: x.product.sub_families[0].products[0].price,
                                        count: this.c
                            }]
            }]};
     a.sub_families[0].products[0].extraCharge = [];

     console.log(a);
     for (const c of this.checks) {
            if (c.checked === true) {
                check = {
                    id: c.id,
                    name: c.name,
                    price: c.price,
                    order_app: c.order_app,
                    product_image: undefined,
                    type: c.type,
                    count: c.count
                };
                a.sub_families[0].products[0].extraCharge.push(check);
            }
        }


    }
        console.log(a);
        this.view.dismiss(a);
    }
    count() {
        this.c++;
        console.log(this.range);
    }
    discount() {
        this.c--;
    }
    cancel(x) {
        const data: Family = {
            id: x.id,
            name: x.name,
            family_id:x.family_id,
            order_appearance: x.order_app,
            subfamily_image: undefined,
            sub_families: x.sub_families,


            products: [{
                    family_id: x.product.family_id,
                    id: x.product.id,
                    name: x.product.name,
                    designation: x.product.designation,
                    order_app: x.product.order_app,
                    product_image: x.product.product_image,
                    extraCharge: [],
                    price: x.product.price,
                    count: x.product.count

            }]
        };
        this.view.dismiss(data, '1');
    }
}
