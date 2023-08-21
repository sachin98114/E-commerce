import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
apiUrl="http://localhost:3000/seller"
isLoginError= new EventEmitter<boolean>(false);
isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  constructor(private http:HttpClient, private router:Router) { }
  register(data:signUp):void{
    this.http.post(this.apiUrl, data,{observe:"response"}).subscribe((result:any)=>{
      console.log("register", result)
      if(result){
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }
    })
  }

  login(data:login):void{
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((result:any)=>{
      console.warn(result)
      if(result && result.body && result.body.length===1){
        this.isLoginError.emit(false)
        localStorage.setItem('seller',JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
      }else{
        console.warn("login failed");
        this.isLoginError.emit(true)
      }
     })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true)
      this.router.navigate(['seller-home'])
    }
  }
}
