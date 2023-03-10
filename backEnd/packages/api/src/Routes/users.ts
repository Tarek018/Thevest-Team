import HyperExpress from 'hyper-express';
import Pouchdb from 'pouchdb';
const jwt=require('jsonwebtoken');



const route =new HyperExpress.Router();


route.post("/signin",async(req, res)=> {
  const db=new Pouchdb("http://admin:admin@127.0.0.1:5984/fblite")
    req.body=await req.json();
    let payload={
      user:req.body.user,
      email:req.body.email
    }
    let user=await req.body;
    user.DataType="User";
    db.post(user);
    let token=await jwt.sign(payload,'123456');            
    res.json({mytoken:token});
});


route.post("/login",async(req, res)=> {
  const db=new Pouchdb("http://admin:admin@127.0.0.1:5984/fblite")
    req.body=await req.json();
    
    let x= req.body.user;    
    const user=await db.find({
        selector: {
          user: {
            $eq :x
          }
        }
      });                  
       if(user.docs==''){
        res.send("Email or password incorrect");
       }else{
        let validpass=await user.docs[0].pass;
         if(validpass==req.body.pass){
            let payload={
                user:user.docs[0].user,
                password:user.docs[0].pass
            }
            var token=jwt.sign(payload,'123456');            
            res.json({mytoken:token});            
         }else {
             res.send("Email or password incorrect")
         }
        
       }
});

route.post('/account',async(req,res)=>{
  const db=await new Pouchdb("http://admin:admin@127.0.0.1:5984/fblite")
  req.body=await req.json();
  console.log(req.body);
  let info=await db.find({
    selector:{
      user:{
        $eq:req.body
      }
    }
  });
  console.log(JSON.stringify(info.docs));
  res.send(JSON.stringify(info.docs))
  
  

});


module.exports=route;