import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  orderData:order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result:any)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result:any)=>{
      this.orderData=result;
    })
  }

}