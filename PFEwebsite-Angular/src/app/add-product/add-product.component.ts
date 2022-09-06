import { Component, OnInit } from '@angular/core';
import {FamilyService} from '../service/familyService/family.service';
import {Family} from '../interface/family';
import {error} from 'util';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from '../interface/product';
import {ProductService} from '../service/productService/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  constructor(private snackBar: MatSnackBar, private http: HttpClient, private familyService: FamilyService, private productService: ProductService) { }

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  family: Family[];
  unamePattern = "[0-9]{1,3}.[0-9]{1,3}";
  price = '';
  loading = false;
  filedata: any;
  fam: Family = undefined;
  subF: Family = undefined;
  inputs = new FormGroup({
    nameFormControl : new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),
    priceFormControl: new FormControl('', [
      Validators.required,
      Validators.pattern(this.unamePattern)]
      ),
    descriptionFormControll: new FormControl('', [
      Validators.required,
      Validators.maxLength(255)]),
    pictureFormControl : new FormControl('', [
      Validators.required])
  });
  name = '';
  desc = '';
  myFile: any;
  headers: HttpHeaders;
 myFormData: FormData;
   async ngOnInit() {
     const data = await this.familyService.getAll().toPromise();
     this.family = data as Family[];
     console.log(this.family);
   }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  async onSubmit($event: any) {


    const prod: Product = {
      id: undefined,
      family_id: undefined,
      order_app: 1,
      name: this.name,
      designation: this.desc,
      product_image: undefined,
      price: this.price as unknown as number,
      count: undefined,
      extraCharge: []
    };
    if (this.subF != undefined) {
      prod.family_id = this.subF.id;
      console.log(this.subF.id);
    } else {
      prod.family_id = this.fam.id;
    }
    const data = await this.http.post('http://localhost:8000/api/addProd', prod).toPromise();
    console.log(data);
    this.http.post('http://localhost:8000/api/addImage', this.myFormData).subscribe(data1 => {
      console.log(data1);
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
      }
    );
  }


  change(fam: Family) {
    if (fam.sub_families.length == 0) {
      this.subF = undefined;
    }
  }

  fileEvent(e) {
   /* const elem = e.target;
    this.filedata = e.target.files[0] ;
    console.log(this.filedata);
    console.log(e);
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'multipart/form-data');
    this.headers.append('Accept', 'application/json');
    this.myFormData = new FormData();
    this.myFormData.append('myfile', this.filedata);*/
     this.myFormData = new FormData();
     this.headers = new HttpHeaders();
     const filedata = e.target.files[0];
     this.headers.append('Content-Type', 'multipart/form-data');
     this.headers.append('Accept', 'application/json');
     this.myFormData.append('image', filedata, 'bilel');



  }
}
