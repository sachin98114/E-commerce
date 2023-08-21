import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productList: any;
  productMessage: undefined | string;

  constructor(private productSwervice:ProductService,private toster:ToastrService ){}
  ngOnInit(): void {
    this.list();
  }


  list() {
    this.productSwervice.productList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }

  deleteProduct(id: number) {
    this.productSwervice.deleteProduct(id).subscribe((result) => {
      console.log(result);
      if (result) {
        this.productMessage = 'Product is deleted';
        this.toster.error(" Product is deleted")
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
