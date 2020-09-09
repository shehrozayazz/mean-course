import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import {PostCreateComponent} from './post/post-create/post-create.component';
import { HeaderComponent } from "./header/header.component";
import { PostListComponent } from "./post/post-list/post-list.component";
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthInterceptor} from './auth/auth-interceptor';



@NgModule({
  declarations: [
    AppComponent,PostCreateComponent,HeaderComponent,PostListComponent,LoginComponent,SignupComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    BrowserAnimationsModule,FormsModule,
    MatInputModule,MatCardModule,MatButtonModule,MatToolbarModule,
    MatExpansionModule,HttpClientModule,MatProgressSpinnerModule,MatPaginatorModule,ReactiveFormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
