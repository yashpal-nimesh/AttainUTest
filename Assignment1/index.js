var express=require('express');
var app=express();
var mongoClient=require('mongodb').MongoClient;
var db;
mongoClient.connect('mongodb://127.0.0.1:27017',function(err,client){
    if(err) throw err;
    db=client.db('Asignment');
});
const fs = require('fs');
let rawdata = fs.readFileSync('cities.json');
let data = JSON.parse(rawdata);
app.get('/addData',function(req,res){
let y= data.map(item => item.state)
  .filter((value, index, self) => self.indexOf(value) === index)
    // console.log(y[0])
for (let i = 0; i < y.length; i++) {
    let city=[];
  let x=data.filter((item)=>item.state===y[i]);
console.log(x);  
for (let j = 0; j < x.length; j++) {
    city.push(x[j].name)
}
let obj={State : x[0].state,cities:city}
    db.collection('cities').insert(obj,function(err,result){
        console.log("inserted");
    });
}
   
})
app.get('/state/:state/add/:city',function(req,res){
console.log(req.params.city);
db.collection("cities").update(
    { State: req.params.state},
    {
      $push: {
        cities: {
           $each: [req.params.city]
        }
      } 
    } 
 )
});

app.get('/state/:state/remove/:city',function(req,res){
    console.log(req.params.city);
    db.collection("cities").update(
        { State: req.params.state },
        { $pull: { cities: req.params.city} },
        { multi: true }
     )
});

app.listen(3000);