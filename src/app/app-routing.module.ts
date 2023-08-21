import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrderComponent } from './my-order/my-order.component';

const routes: Routes = [
  {path:"seller", component:SellerAuthComponent},
  {path:"", component:HomeComponent},
  {path:"userLogin", component:UserAuthComponent},
  {path:"cart", component:CartPageComponent},
  {path:"seller-home", component:SellerHomeComponent,canActivate:[AuthGuard]},
  {path:"seller-add-product", component:SellerAddProductComponent,canActivate:[AuthGuard]},
  {
    component:SellerUpdateProductComponent,
    path:'seller-update-product/:id',
    canActivate:[AuthGuard]
  },
  {
    component: SearchComponent,
    path:'search/:query'
  },{
    component:ProductDetailsComponent,
    path:'details/:productId'
  },{
    component:CheckoutComponent,
    path:'checkout'
  }
  ,{
    component:MyOrderComponent,
    path:'my-orders'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
