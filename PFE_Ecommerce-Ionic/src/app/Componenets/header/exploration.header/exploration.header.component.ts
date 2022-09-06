import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ModalController, NavController} from '@ionic/angular';
import { ListProductComponent } from '../../list-product/list-product.component';
import { Family } from 'src/app/Interfaces/products/family';
import {NavigationExtras, Router} from "@angular/router";
import {User} from "../../../Interfaces/users/user";

@Component({
  selector: 'app-explorationheader',
  templateUrl: './exploration.header.component.html',
  styleUrls: ['./exploration.header.component.scss'],
})
export class ExplorationHeaderComponent implements OnInit {
    @Input() count: number;
    @Input() card: Array<Family>;
    @Input() allProducts: Array<Family>;
    @Output() eventEmitter = new EventEmitter();
    @Input() user: User;

    constructor(private navCtrl: NavController, private modelCltrl: ModalController, private router: Router) {
    }

    ngOnInit() {
        console.log(this.user);

    }

     openCart() {
        console.log(this.card);
        const navigationExtras: NavigationExtras = {state: {
                allProd: this.allProducts,
                products: this.card,
                count: this.count,
                user: this.user
            }
        };

        this.router.navigate(['/list-product'], navigationExtras);
        /*this.router.navigate(['destination-path'], navigationExtras);
        const modal1 = await this.modelCltrl.create({
            component: ListProductComponent,
            componentProps: {
                allProd: this.allProducts,
                products: this.card,
                count: this.count
            }

        });
        modal1.onDidDismiss().then(data => {
            console.log(data.data)
            this.count = data.data;
            this.sendCount();
        });

        await modal1.present();*/

    }

    sendCount() {
        this.eventEmitter.emit(this.count);
    }
}
