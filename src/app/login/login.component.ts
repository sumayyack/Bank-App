import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  aim="Your Perfect Banking Partner"
  accno="Account Number Please"
  acno=""
  pswd=""

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })



  constructor(private router:Router,private ds:DataService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  //acnoChange(event:any){
   // this.acno=event.target.value
   // console.log(this.acno);
    

 // }
  //pswdChange(event:any){
   // this.pswd=event.target.value
   // console.log(this.pswd);
    

  //}
  login(){
    console.log(this.loginForm)

    var acno=this.loginForm.value.acno
    var password=this.loginForm.value.pswd
  
    if(this.loginForm.valid){
      
      let result=this.ds.login(acno,password)
  
      if(result){
        alert("Login successfull")
          this.router.navigateByUrl('dashboard')
      }
  
  
    }
    else{
      alert("InvalidForm")
    }

    


    
  }

 //login(a:any,p:any){
  // console.log(a);
  // var acno=a.value
   //var password=p.value

  // let database=this.users

   //if(acno in database){
    // if(password==database[acno]["password"]){
    //   alert("Login succesful")
    // }
    // else{
    //   alert("Incorrect Password")
    // }

   //}
   //else{
   //  alert("Invalid Account Number")
   //}
   
 //}

}
