import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Family} from '../../interface/family';
import {FamilyService} from '../../service/familyService/family.service';
import {Product} from '../../interface/product';
import {ProductService} from '../../service/productService/product.service';
import {ExtraCharge} from '../../interface/extraCharge';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {error} from "util";

@Component({
  selector: 'app-add-extra',
  templateUrl: './add-extra.component.html',
  styleUrls: ['./add-extra.component.css']
})
export class AddExtraComponent implements OnInit {
  fam: Family = undefined;
  subF: Family = undefined;
  unamePattern = "[0-9]{1,3}.[0-9]{1,3}";
  price = '';
  inputs = new FormGroup({
    nameFormControl : new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    priceFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern(this.unamePattern)]
    ),

  });
  name = '';
  private family: Family[];
  prod: Product = undefined;
 type: string = undefined;
  constructor(private snackBar: MatSnackBar, private familyService: FamilyService, private productService: ProductService) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  async ngOnInit() {
    const data = await this.familyService.get().toPromise();
    this.family = data as Family[];
    console.log(this.family);
    console.log(this.family);
  }
  change(fam: Family) {
    if (fam.sub_families.length == 0) {
      this.subF = undefined;
    }
    this.prod = undefined;

  }



  changex() {
    this.prod = undefined;
  }

  async onSubmit($event: any) {
   const extra: ExtraCharge = {
     id: undefined,
     name: this.name,
     price: this.price as unknown as number,
     order_app: 1,
     product_image: undefined,
     type: this.type,
     count: undefined
   };
   this.productService.addExtra(this.prod.id, extra).subscribe(data => {
     console.log(data);
   },
     () => {
       console.log(error);
     },
     ()  => {
       this.snackBar.open('The new product has been added', '' , {
         duration: 4000,
         horizontalPosition: this.horizontalPosition,
         verticalPosition: this.verticalPosition,
       });
     });
  }
}
