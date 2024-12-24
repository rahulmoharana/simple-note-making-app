const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,file)=>{
        
        res.render("index",{files:file})
        
    })

})
app.get('/file/:filename',(req,res)=>{
   fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,data){
   res.render('show',{filename:req.params.filename,filedata :data})

   })
    })

app.post('/create',(req,res)=>{
   fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`,req.body.details,function(err){

    res.redirect("/")
   })
    

})

app.listen(4000)