import HyperExpress from 'hyper-express';
import Pouchdb from 'pouchdb';
import PouchDB_Find from 'pouchdb-find';
Pouchdb.plugin(PouchDB_Find);


const route =new HyperExpress.Router();

route.post("/addpost",async(req, res)=> {
    let post=await req.json(); 
    const db = new Pouchdb('http://admin:admin@127.0.0.1:5984/fblite');
    post.DataType="post";
    db.post(post);
});

route.get("/",async(req,res)=>{
    const db = await new Pouchdb('http://admin:admin@127.0.0.1:5984/fblite');
    let posts=await db.find({
        selector: {
            DataType: {
              $eq :"post" 
            }
          }
    });
    console.log(posts.docs);
    res.send(JSON.stringify(posts.docs))
});

route.post('/myposts',async(req,res)=>{
    req.body=await req.json();
    const db = await new Pouchdb('http://admin:admin@127.0.0.1:5984/fblite');

    let posts=await db.find({
        selector:{
            DataType:'post',
            user:req.body
        }
        
    });
    console.log(posts.docs);
    res.send(JSON.stringify(posts.docs));
    
});

route.post('/delete',async(req, res)=> {
    const db = await new Pouchdb('http://admin:admin@127.0.0.1:5984/fblite');
    const postId =await req.json();
    db.get(postId).then( (doc)=> {
         db.remove(doc);
    });
    res.send(JSON.stringify('mrigla'))
    

})

module.exports=route;