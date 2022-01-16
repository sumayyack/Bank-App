import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUserName:any

  currentAcno:any


  users:any={
    1000:{acno:1000,uname:"anu",password:"1000",balance:5000,transaction:[]},
    1001:{acno:1001,uname:"abu",password:"1001",balance:5000,transaction:[]},
    1002:{acno:1002,uname:"aan",password:"1000",balance:5000,transaction:[]},
  }


  constructor() { 
    this.getDetails()
  }

  


// to store in local storage

saveDetails(){
  if(this.users){
    localStorage.setItem("userDB",JSON.stringify(this.users))
  }

  if(this.currentUserName){
    localStorage.setItem("cUserName",JSON.stringify(this.currentUserName))
  }

  if(this.currentAcno){
    localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  }
}

// to get values from local storage

getDetails(){
  if(localStorage.getItem("userDB")){
    this.users=JSON.parse(localStorage.getItem("userDB") || '')
  }

  if(localStorage.getItem("cUserName")){
    this.currentUserName=JSON.parse(localStorage.getItem("cUserName") || '')
  }

  if(localStorage.getItem("currentAcno")){
    this.currentAcno=JSON.parse(localStorage.getItem("currentAcno") || '')
  }

}





  register(acno:any,password:any,uname:any){

    let db=this.users
    if(acno in db){
      return false
    }
    else{
      db[acno]={
        acno,
        uname,
        password,
        balance:0,
        transaction:[]
      }
      this.saveDetails()
      return true
    }
  
  }

  login(acno:any,password:any){
    let database=this.users

    if(acno in database){
      if(password==database[acno]["password"]){
        this.currentAcno=acno
        this.currentUserName = database[acno]["uname"]
        this.saveDetails()
        return true

      }
      else{
        alert("Incorrect password")
        return false
      }

    }
    else{
      alert("Invalid Account Number")
      return false
    }


  }

  getTransaction(){

    return this.users[this.currentAcno].transaction

  }

  deposit(acno:any,password:any,amt:any){

    var amount = parseInt(amt)
    let db=this.users

    if(acno in db){
      if(password==db[acno]["password"]){
        db[acno]["balance"]=db[acno]["balance"] + amount
        db[acno].transaction.push({
          amount:amount,
          type:"CREDIT"
        })
        this.saveDetails()
        return db[acno]["balance"]

      }
      else{
        alert("Incorrect password")
        return false
      }

    }
    else{
      alert("Account doesn't exist!!")
      return false
    }

  }

  withdraw(acno:any,password:any,amt:any){

    var amount = parseInt(amt)
    let db=this.users

    if(acno in db){
      if(password==db[acno]["password"]){

        if(db[acno]["balance"]>amount){
          db[acno]["balance"]=db[acno]["balance"] - amount
          db[acno].transaction.push({
            amount:amount,
            type:"DEBIT"
          })
          this.saveDetails()
          return db[acno]["balance"]
        }
        else{
          alert("Insufficient balance")
          return false
        }

      }
      else{
        alert("Incorrect password")
        return false
      }

    }
    else{
      alert("Account doesn't exist!!")
      return false
    }

  }
}
