const Express = require("express");
const BodyParser = require("body-parser");
const ejs = require("ejs");
const app = Express();

app.set('view engine','ejs');
app.use(Express.static("public"));
app.use(BodyParser.urlencoded({extended:true}));


const mongoose = require("mongoose");
// connection
mongoose.connect("mongodb://127.0.0.1:27017/railwayDB",()=>{console.log("connected !");});
// Schema
const trainSchema = mongoose.Schema({
    Source:String,
    Destination:String,
    TrainName:String,
    Seats:Number
});
// model
const trains = mongoose.model("trains",trainSchema);

// Home routing
app.route("/")
.get((req,res)=>{
    res.render("index"); 
})
.post((req,res)=>{
    const s = req.body.source;
    const desti = req.body.dest;
    trains.find({Source:s,Destination:desti},(err,founditem)=>{
        if(!err){res.render("index",{train:founditem});}else{console.log(err);}});
});

// Team routing
app.get("/team",(req,res)=>{
res.render("team");
});


app.listen(3000,()=>{
    console.log("server is at 3000 !");
    console.log("http://localhost:3000/");
});