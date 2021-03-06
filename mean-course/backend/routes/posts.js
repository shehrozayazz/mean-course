const express=require("express");
const Post=require("../models/post");
const checkAuth=require("../middleware/check-auth");
const router=express.Router();


router.post("",(req,res,next)=>{
  const post = new Post({
    title:req.body.title,
    content:req.body.content
  });
  post.save().then(result=>{

    res.status(201).json({
      message:"Post added!",
      postId:result._id
    });


  });
});

router.get("/:id",(req,res,next)=>{


  Post.findById(req.params.id).then(post=>{

    if(post){
      res.status(200).json(post);

    }
    else{
      res.status(404).json({message:"Post not found!"});
    }


  });
});

router.put("/:id",(req,res,next)=>{
  const post = new Post({
    _id:req.body.id,
    title:req.body.title,
    content:req.body.content
  });

  Post.updateOne({_id:req.params.id},post).then(result=>{

   // console.log(result);
    res.status(200).json({messages:"Update successful!"});
  }

  );

});

 router.get('',(req,res,next)=>{

  const pageSize=+req.query.pagesize; // In order to change a string to a number we use the "+" operator at the start
  const currentPage=+req.query.page;
  const postQuery=Post.find();
  let fetchedPosts;
  if(pageSize&&currentPage){
    postQuery
    .skip(pageSize*(currentPage-1))
    .limit(pageSize);
  }

   postQuery.find().then(documents=>{
     fetchedPosts=documents;
    return Post.count();
   })
   .then(count=>{
    res.status(200).json({
      message:'Posts fetched successfully',
      posts:fetchedPosts,
      maxPosts:count
    });

   })



 });

 router.delete("/:id",checkAuth,(req,res,next)=>{


  Post.deleteOne({_id:req.params.id}).then(result=>{
   // console.log(req.params.id);
    res.status(200).json({message:"Post deleted!"});

  })
 });

 module.exports=router;
