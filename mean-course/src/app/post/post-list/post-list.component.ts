import { Component, OnInit , OnDestroy} from '@angular/core';
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls:['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService:PostsService, private authService:AuthService) { }
  isLoading=false;
  totalPosts=0;
  postsPerPage=5;
  currentPage=1;
  pageSizeOptions=[3,5,10];
  userIsAuthenticated=false;
  posts:Post[]=[];
  private postSub:Subscription;
  private authStatusSub:Subscription;
  ngOnInit() {
   this.postsService.getPosts(this.postsPerPage,this.currentPage);
   this.isLoading=true;
    this.postSub=this.postsService.getPostUpdateListener()

    .subscribe((postData:{posts:Post[],postCount:number})=>{
      this.isLoading=false;
      this.totalPosts=postData.postCount;

      this.posts=postData.posts;
    });



    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authStatusSub=this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated=isAuthenticated;
    });
  }


  ngOnDestroy(){
    this.postSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(postId:string){
    this.isLoading=true;
    this.postsService.deletePost(postId).subscribe(()=>{
      this.postsService.getPosts(this.postsPerPage,this.currentPage)
    });
  }

  onChangedPage(pageData:PageEvent){
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1; // because index starts at 0
    this.postsPerPage=pageData.pageSize;


    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }


}
