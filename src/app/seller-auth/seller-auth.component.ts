import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../service/seller.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin=false;
  registrationForm!: FormGroup;
  loginForm!: FormGroup;
  authError: string="";
  isSellerLoggedIn= new BehaviorSubject<boolean>(false);
  constructor(private fb: FormBuilder, private service:SellerService, private router:Router, private toster:ToastrService){}


  ngOnInit(): void {
    this.service.reloadSeller()
    this.registrationForm = this.fb.group({
      name:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  openLogin(){
   this.showLogin=!this.showLogin
  }

  onSubmitRegistration(){
    if (this.registrationForm.valid) {
      // console.log('Form submitted successfully:', this.registrationForm.value);
      this.service.register(this.registrationForm.value);
    }
  }
  onSubmitLogin():void{
    if (this.loginForm.valid) {
      console.log('Form submitted successfully:', this.loginForm.value);
      this.service.login(this.loginForm.value);
      this.service.isLoginError.subscribe((iserror:any)=>{
        this.toster.success("Seller Login")
        if(iserror){
          this.authError="Email or Password is not correct"
          this.toster.warning("Email or Password is not correct")

        }
      })
    }
  }
}
