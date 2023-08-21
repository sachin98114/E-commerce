import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
  productForm!: FormGroup;
  addProductMessage: string = ''

  constructor(private formBuilder: FormBuilder, private service: ProductService,private toster:ToastrService, private router:Router) { }

  ngOnInit(): void {
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
    if (this.productForm.valid) {
      console.log('Form data submitted:', this.productForm.value);
      this.service.addProduct(this.productForm.value).subscribe((result: any) => {
        console.log(result)
        if (result) {
          this.addProductMessage = 'Product is added successfully';
          this.toster.success("Product is added successfully")
        }
        setTimeout(() => {
          this.addProductMessage = ''
          this.productForm.reset();
          this.router.navigate(['/seller-home'])
        }, 3000);
      });
    }
  }
}