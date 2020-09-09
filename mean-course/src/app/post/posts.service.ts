import {Post} from './post.model';
import { HttpClient  } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import {Router} from "@angular/router";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class PostsService{
  private posts:Post[]=[];

  constructor(private http:HttpClient,private router:Router){}

  private postUpdated= new Subject<{posts:Post[],postCount:number}>();

  getPosts(postsPerPage:number,currentPage:number){

    const queryParams=`?pagesize=${postsPerPage}&page=${currentPage}`;

    this.http
    .get<{message:string;posts:any,maxPosts:number}>('http://localhost:3000/api/posts'+queryParams)
    .pipe(map((postData)=>{
      return{posts: postData.posts.map(post=>{
        return{
          title:post.title,
          content:post.content,
          id:post._id
        };
      }),maxPosts:postData.maxPosts};

    }))
    .subscribe(transformedPostsData=>{

      this.posts=transformedPostsData.posts;
      this.postUpdated.next({posts:[...this.posts],postCount:transformedPostsData.maxPosts});

    });
  }
  getPostUpdateListener(){
    return this.postUpdated.asObservable();
  }
  getPost(id:string){

    return this.http.get<{_id:string,title:string,content:string}>("http://localhost:3000/api/posts/"+id) ;
  }

  addPost(title:string,content:string){


    const post:Post={id:null, title:title,content:content};
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post)
    .subscribe((responseData)=>{
      // const id=responseData.postId;
      // post.id=id;
      // this.posts.push(post);
      // console.log("New Post added!"+post);
      // this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);

    });
  }

  deletePost(postId:string){
    return this.http.delete('http://localhost:3000/api/posts/'+postId);
  }

  updatePost(id:string,title:string,content:string){

    const post:Post={id:id,title:title,content:content};
    this.http
    .put("http://localhost:3000/api/posts/"+id,post)
    .subscribe(response=>{

      // const updatedPosts=[...this.posts];
      // const oldPostIndex=updatedPosts.findIndex(p=>p.id===post.id);
      // updatedPosts[oldPostIndex]=post;
      // this.posts=updatedPosts;
      // this.postUpdated.next([...this.posts]);
      this.router.navigate(["/"]);


    });
  }




}
