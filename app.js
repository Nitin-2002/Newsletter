const express=require("express");
const bodyParser=require("body-parser")
const request =require("request");
const app=express();
const https=require("https");
const { dirname } = require("path");
app.use(bodyParser.urlencoded({extended :true}))
app.use(express.static("public"))
app.listen(1010,()=>{
    console.log("server is running")
})
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/signup.html');
})

app.post('/',(req,res)=>{
    const FirstName=req.body.firstName
    const LastName=req.body.lastName
    const email=req.body.Email
  var data={
    members:[
        {
            email_address:email,
            status: "subscribed",
            merge_fields:{
                FNAME: FirstName,
                LNAME: LastName
            }
        }
    ]
  };

var jsonData=JSON.stringify(data);
const url="https://us14.api.mailchimp.com/3.0/lists/09a6c0944d"
const options={
    method:"POST",
    auth: "nitin:12684fdcb17d6c1aba5066852a01da57-us14"

}
const request =https.request(url,options,(response)=>{
   if (response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
    response.on("data",(data)=>{
        console.log(JSON.parse(data))
    })
}) 

 request.write(jsonData);
 request.end ();

})

app.post("/failure",(req,res)=>{
     res.redirect("/");
})


// apikey
// 12684fdcb17d6c1aba5066852a01da57-us14
//listid
//09a6c0944d