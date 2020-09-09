import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthData} from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Injectable({providedIn:'root'})
export class AuthService{
  isAuthenticated=false;
  private token:string;
  private tokenTimer:any;
  private authStatusListener=new Subject<boolean>();

  constructor(private http:HttpClient,private router:Router){}
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getToken(){
    return this.token;
  }
  createUser(email:string,password:string){
    const authData:AuthData={email:email,password:password};

    this.http.post("http://localhost:3000/api/user/signup",authData)
    .subscribe(response=>{
      console.log(response);
    })
  }


  login(email:string,password:string){

    const authData:AuthData={email:email,password:password};

    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login",authData)
    .subscribe(response=>{
     const expiresInDuration=response.expiresIn;
     this.setAuthTimer(expiresInDuration);
     const token=response.token;
     this.token=token;
     if(token){
       this.isAuthenticated=true;
       this.authStatusListener.next(true);

       const now=new Date();
       const expirationDate=new Date(now.getTime()+ expiresInDuration*1000);
       this.saveAuthData(token,expirationDate);

       this.router.navigate(['/']);
     }


    })



  }

  logout(){
    this.token=null;
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);

  }
  private saveAuthData(token:string,expirationData:Date){
     localStorage.setItem('token',token);
     localStorage.setItem('expiration',expirationData.toISOString());

  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData(){
    const token=localStorage.getItem("token");
    const expirationDate=localStorage.getItem("expiration");

    if(!token||!expirationDate){
      return;
    }
    return{
      token:token,
      expirationDate:new Date(expirationDate)
    }

  }

  private setAuthTimer(duration:number){
    this.tokenTimer=setTimeout(()=>{
      this.logout();

    },duration*1000);  // This function works with milli seconds


  }
  autoAuthUser(){

    const authInformation=this.getAuthData();
    if(!authInformation){
      return;
    }
    const now =new Date();
    const expiresIn=authInformation.expirationDate.getTime()-now.getTime();


    if(expiresIn>0){
      this.token=authInformation.token;
      this.isAuthenticated=true;
      this.setAuthTimer(expiresIn/1000); // Convert it into seconds
      this.authStatusListener.next(true);
    }


  }

}
