import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../service/seller.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { cart, login, signUp } from '../data-type';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin = false;
  userRegistrationForm!: FormGroup;
  userLoginForm!: FormGroup;
  authError: string = "";
  // isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder, private user: UserService, private router: Router,private product:ProductService) { }


  ngOnInit(): void {
    this.user.userAuthReload();
    this.userRegistrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  signUp() {
    this.user.userSignUp(this.userRegistrationForm.value);
  }
  login() {
    this.user.userLogin(this.userLoginForm.value)
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn(result);
      if(result){
         this.authError="User not found"
      }else{
        this.localCartToRemoteCart();
      }
      
    })
  }

  openLogin(){
this.showLogin=!this.showLogin;
  }

  localCartToRemoteCart(){
   let data = localStorage.getItem('localCart');
   let user = localStorage.getItem('user');
   let userId= user && JSON.parse(user).id;
   if(data){
    let cartDataList:any= JSON.parse(data);
  
    cartDataList.forEach((product:any, index: number)=>{
      let cartData:cart={
        ...product,
        productId:product.id,
        userId
      }
      delete cartData.id;
      setTimeout(() => {
        this.product.addToCart(cartData).subscribe((result:any)=>{
          if(result){
            console.warn("data is stored in DB");
          }
        })
      }, 500);
      if(cartDataList.length===index+1){
        localStorage.removeItem('localCart')
      }
    })
   }

   setTimeout(() => {
    this.product.getCartList(userId)
   }, 2000);
    
  }
}
