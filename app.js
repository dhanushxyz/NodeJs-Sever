var express = require('express');
var sql = require('mysql2');
var cors = require('cors')
var app = express();

app.use(cors());

app.use(express.json());

const db = sql.createConnection({
    user:"root",
    host:"localhost",
    password:"admin",
    database:"moviestables",
});

 app.get('/',(req,res)=>{
    res.end("dhanush");
})

app.post('/login',(req,res)=>{
    const useremail = req.body.e;
    const password = req.body.p;
    
    db.query("SELECT * FROM login WHERE email_Id=? AND loginpassword =?",[useremail,password],(err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length>0){
            
            res.send(result)
            
        }
        else{
            res.send({
                message:"its wrong combination"
            })
        }
        
            
        
    })
});
 
app.get('/movie',(req,res)=>{
    db.query("SELECT * FROM moviedetail;",(err,result)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
})

app.post('/Alogin',(req,res)=>{
    const email = req.body.e;
    const password = req.body.p;
    
    db.query("SELECT * FROM adminlogin WHERE email=? AND password =?",[email,password],(err,result)=>{
        if(err){
            res.send({err:err})
        }
        if(result.length>0){
            
            res.send(result)
            
        }
        else{
            res.send({
                message:"its wrong combination"
            })
        }
        
            
        
    })
});

app.post('/remove',(req,res)=>{
    email = req.body.e
    db.query("DELETE FROM login WHERE email_Id = ?",(email),(err,result)=>{
        if(!result){
            res.send({message:"err"})
        }
    })
})

app.listen(3001,()=>{
    console.log("server running on the port 3001");
}
)