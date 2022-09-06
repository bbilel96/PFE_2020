import {Component, OnInit, ChangeDetectionStrategy, ViewChild} from '@angular/core';
import {ProductService} from 'src/app/Services/product/product.service';
import {AlertController, IonicModule, LoadingController, NavController} from '@ionic/angular';
import {Router, ActivatedRoute, NavigationExtras} from '@angular/router';
import {PublicityService} from 'src/app/Services/publicity/publicity.service';
import {Product} from 'src/app/Interfaces/products/product';
import {ModalController} from '@ionic/angular';
import {ProductComponent} from '../../../Componenets/description/product/product.component';
import { Family } from 'src/app/Interfaces/products/family';
import { ListProductComponent } from 'src/app/Componenets/list-product/list-product.component';
import { ExtraCharge } from 'src/app/Interfaces/products/extra-charge';
import {ExplorationHeaderComponent} from 'src/app/Componenets/header/exploration.header/exploration.header.component';
import { FamilyService } from 'src/app/Services/familyService/family.service';
import {User} from '../../../Interfaces/users/user';
import {AuthService} from '../../../Services/storage/auth/auth.service';
import {StorageService} from '../../../Services/storage/storage.service';
import {Publicity} from '../../../Interfaces/publicity';
import {RestaurantService} from '../../../app/Services/restaurant.service';
import {Restaurant} from '../../../Interfaces/restaurant/Restaurant';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;





@Component({
    selector: 'app-product',
    templateUrl: './product.page.html',
    styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
    data: any;
    data1: any;
    user: any;
    index;
    count = 0;
    family = '1';
    family1 = '1';
    items: Family [];
    sliderConfig = {};
    pubs: Publicity[];
    item: Family = null;
    slideOptions = {
        autoplay: true,
        speed: 2000,
        spaceBetween: 10,
        centredSlides: true
    };
    restaurant: Restaurant;
    card: Array<Family> = [];
    // @ViewChild('myselect', {static: true}) SelectComponent: SelectSearchableModule;
// tslint:disable-next-line:max-line-length
    constructor(private prodStorage: StorageService,
                private authService: AuthService,
                private modelCltrl: ModalController,
                private pubService: PublicityService,
                private familyService: FamilyService,
                private router: Router,
                private auth: AuthService,
                private loadingController: LoadingController,
                private alertController: AlertController,
                private restaurantService: RestaurantService
    ) {
        if (this.router.getCurrentNavigation().extras.state) {
            this.data1 = this.router.getCurrentNavigation().extras.state;
            console.log(this.data1);
        }
        console.log('hfhfhfh');
    }
    async ionViewWillLeave() {
        await this.prodStorage.setCard(this.card, this.count);
    }
    async ionViewDidEnter() {

        document.addEventListener('backbutton',
            (e) => {
            console.log('disable back button');
        }, false);
        if (await this.prodStorage.getCommand() != null) {
            await this.prodStorage.deleteCommand();
            await this.prodStorage.setCard([], 0);
        }
        this.restaurantService.getRestaurant().subscribe(data => {
            this.restaurant = data;
            console.log(this.restaurant);
        });
        this.familyService.getAll().subscribe(res => {
                this.items = res as Family[];
                console.log(this.items);
            },
            async error => {
                const alert = await this.alertController.create({
                    header: 'Ops',
                    message: 'Something wrong !',
                    buttons: ['Ok']
                });
                await alert.present();
            });
        console.log(this.items);
        this.pubService.getPub().subscribe(data => {
            this.pubs = data as unknown as Publicity[];
            console.log(this.pubs);
        });
        const loading = await this.loadingController.create({
                message: 'Please wait...',
                duration: 2000
            });
        await loading.present();


        this.card = await this.prodStorage.getCard();
        console.log(this.card);
        this.count = await this.prodStorage.getCount();
        if (this.data1 != undefined) {
            this.count = this.data1.count;
        }
    }

     async ngOnInit() {

         console.log('userrrr', this.user);
         /*this.geolocation.getCurrentPosition().then((resp) => {
             // resp.coords.latitude
             // resp.coords.longitude
         }).catch((error) => {
             console.log('Error getting location', error);
         });

         const watch = this.geolocation.watchPosition();
         watch.subscribe((data) => {
             // data can be a set of coordinates, or an error (if an error occurred).
             console.log(data.coords.latitude);
             this.cust.latitude = data.coords.latitude;
             console.log(data.coords.longitude);
             this.cust.longitude = data.coords.longitude;
         });*/

         await this.getuser();


     }
     async getuser() {
         this.user = await this.auth.getuser();
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
            console.log('My Card (addProduct)', this.card);
            console.log('product Selected', prod);

            if (this.card.length === 0) {
                console.log(this.count);
                this.card.push(prod);
                console.log(this.count);
                this.count++;
                return;
            } else {
                for (const fam of this.card) {
                    // tslint:disable-next-line:triple-equals
                    if (fam.id == prod.id) {
                        fam.products.push(prod.products[0]);
                        console.log('got it', this.card);
                        console.log(this.count);
                        this.count++;
                        console.log(this.count);
                        return;
                    }
                }
                this.card.push(prod);
                console.log(this.count);
                this.count++;
                console.log(this.count);
                console.log('new cat', this.card);
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
            console.log('My Card (addProduct)', this.card);
            console.log('product Selected', prod);

            if (this.card.length === 0) {

                this.card.push(prod);
                console.log(this.count);
                this.count++;
                console.log(this.count);
                return;
            } else {

                for (const fam in this.card) {
                    // tslint:disable-next-line:triple-equals
                    if (this.card[fam].id == prod.id) {
                        for (const p in this.card[fam].sub_families) {
                            if (this.card[fam].sub_families[p].id === prod.sub_families[0].id) {
                                this.card[fam].sub_families[p].products.push(prod.sub_families[0].products[0]);
                                this.count++;
                                return;
                            }
                        }
                        this.card[fam].sub_families.push(prod.sub_families[0]);
                        x = 1;
                        console.log(this.count);
                        this.count++;
                        console.log(this.count);
                        return;
                }
                }
                if (x === 0) {
                    this.card.push(prod);
                    console.log(this.count);
                    this.count++;
                    console.log(this.count);
                    console.log('new cat', this.card);
                }
            }
        }
        console.log('fffff', this.card);
    }

    openCart() {
        console.log(this.card);
        console.log(this.user);
        const navigationExtras: NavigationExtras = {
            state: {
                allProd: this.items,
                products: this.card,
                count: this.count,
                user: this.user
            }
        };
        if (this.user == null) {
            console.log('ffff');
            this.router.navigate(['/exploration/list-product'], navigationExtras);
        } else {
            this.router.navigate(['/customer-side-menu/list-product'], navigationExtras);
        }
    }
    portChange() {
        console.log(this.card);
        const navigationExtras: NavigationExtras = {state: {
                allProd: this.items,
                products: this.card,
                count: this.count
            }
        };
        if (this.authService.isAuthentificated()) {
            this.router.navigate(['customer-side-menu/search'], navigationExtras);
        } else {
            this.router.navigate(['exploration/search'], navigationExtras);
        }

    }
    modifier(data: Family) {
        for (const f of this.card) {
            if (f.id === data.id) {
                for (let p of f.products) {
                    if (p.id === data.products[0].id) {
                        p = data.products[0];
                    }
                }
            }
        }
    }

    async function(fam: Family, dis: Product, sub: Family, x: boolean) {
        console.log('helllooooooooo', sub);
        console.log(dis);
        console.log(fam);
        console.log(this.card);
        let a: Family;
        if (sub === undefined) {
            a = {
                id: fam.id,
                name: fam.name,
                order_appearance: fam.order_appearance,
                sub_families: undefined,
                products: [],
                family_id: fam.family_id,
                subfamily_image: undefined

            };
            a.products.push(dis);
            console.log(a);
        } else {
            a = {
                id: fam.id,
                name: fam.name,
                family_id: fam.family_id,
                order_appearance: fam.order_appearance,
                sub_families: [{
                    id: sub.id,
                    name: sub.name,
                    order_appearance: sub.order_appearance,
                    subfamily_image: sub.subfamily_image,
                    family_id: sub.family_id,
                    products: [{
                        family_id: dis.family_id,
                        id: dis.id,
                        name: dis.name,
                        designation: dis.designation,
                        order_app: dis.order_app,
                        product_image: dis.product_image,
                        extraCharge: [],
                        price: dis.price,
                        count: dis.count
                    }],
                    sub_families: undefined
                }],
                subfamily_image: undefined,
                products: []

            };
            a.sub_families[0].products[0].extraCharge = dis.extraCharge;
        }
        console.log('a', a);

        const modal = await this.modelCltrl.create({
            component: ProductComponent,
            componentProps: {
                product: a,
                card: this.card,
                exist: x
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

    delete(cat, id) {
        console.log('helllllllooo', this.card);

        // tslint:disable-next-line: prefer-for-of
        for (const p of this.card) {
            if (cat === p.id) {
                this.index = p.products.map(e => e.id).indexOf(id);
                console.log('ggggg', id);
                if (this.index !== -1) {
                    p.products.splice(this.index, 1);
                    console.log(this.index);
                    this.count--;
                    console.log('ggggg', p);
                }
                return;
            }
        }
    }
    findProd(cat, id, sub) {

        if (sub === undefined) {
            for (const p of this.card) {
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
            for (const p of this.card) {
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
        return false;
    }
    productC(cat, id, sub) {

        if (sub === undefined) {
            for (const p of this.card) {
                if (cat === p.id) {
                    for (const p1 of p.products) {
                        // console.log('ppppp',p1)
                        if (id === p1.id) {
                            return p1.count;
                        }
                    }
                }
            }
        } else {
            for (const p of this.card) {
                if (cat === p.id) {
                    for (const sub1 of p.sub_families) {
                        if (sub1.id === sub) {
                            for (const p1 of sub1.products) {
                                if (id === p1.id) {
                                    return p1.count;
                                }
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }
    callC(c: number) {
        this.count = c;
    }

    display(x) {
        console.log(x);
    }
}


