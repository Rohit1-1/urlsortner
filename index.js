const express=require("express")
const {connection}=require('./config/db')
const {Url_Model}=require('./model/Urlmodel')
const cors=require("cors");

const app=express()
app.use(cors())
app.use(express.json())


app.listen(8080,async()=>{
    try {
        await connection;
        console.log('Server started on port 8080');
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/',async (req,res)=>{
    let url=await Url_Model.find()
    // res.redirect('https://www.youtube.com/watch?v=SLpUKAGnm-g')
   res.send({"msg":"Home Page",url})
})


app.get('/:id',async(req,res)=>{
    let id=req.params.id;
try {
    let url=await Url_Model.findOne({sort_url:id })
   res.redirect(url.url)
   //res.send(url)
} catch (error) {
    res.send({"msg":"something went wrong"})
}

})


app.post('/',async(req,res)=>{
    let {url,sort_url}=req.body
    if(url&&sort_url){
        console.log('true');
    }

//console.log(sort_url.length)
try {
    if(url&&sort_url&&sort_url?.length>0){
     let unique=await Url_Model.find({sort_url})
     if(unique.length>0){
        res.send({"keyexist":true})
     }
     else{
        let newurl=new Url_Model(req.body)
        newurl.save();
       // console.log(newurl)
        res.send({"sortUrl":true,urlId:newurl.sort_url})
     }
     
        console.log((unique));
    }
    else if(url&&sort_url?.length===0){
        let newurl=new Url_Model({url})
        newurl.save();
        console.log(newurl)
        res.send({"sortUrl":true,urlId:newurl.sort_url})
    }
    else{
        let newurl=new Url_Model(req.body)
        newurl.save();
        console.log(newurl)
        res.send({"sortUrl":true,urlId:newurl.sort_url})
    }
    
} catch (error) {
    console.log(error);
    res.send({"sortUrl":false})
}
})