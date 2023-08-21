import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { product } from '../data-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastRef, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  addProductMessage: string = ''
  productData: undefined | any;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute,private product: ProductService,private formBuilder: FormBuilder,private router:Router,private toster:ToastrService){

  }
  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.product.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });

      this.productForm = this.formBuilder.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        category: ['', Validators.required],
        color: ['', Validators.required],
        image: ['', Validators.required],
      });
  }

  onSubmit() {
    console.log(this.productForm.value)
    if (this.productData) {
      this.productForm.value.id = this.productData.id;
    
    }
    this.product.updateProduct(this.productForm.value).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product has updated';
        this.toster.success("Product is updated successfully")
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
      this.productForm.reset();
      this.router.navigate(['/seller-home'])
    }, 3000);
    
    console.warn(this.productForm.value);
  }
}





  



