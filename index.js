
const express= require("express");
const app=express();
const https= require("https");
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){

res.sendFile(__dirname+"/index.html");
})


app.post("/",function(req,res){

   	const api_key="api key";
	const query=req.body.city;

	const url="https://api.openweathermap.org/data/2.5/weather?appid="+api_key+ "&q="+query  +"";

     https.get(url,function(response){
		console.log(response.statusCode);
		response.on("data",function(data){ 

			const weatherdata	=JSON.parse(data);
			const temp=weatherdata.main.temp;
			const desc=weatherdata.weather[0].description; 
			const icon=weatherdata.weather[0].icon;
			var icondata="http://openweathermap.org/img/wn/"+icon +"@2x.png";
		    var degree= Number(temp)-273;
		    res.write("<h1>Temperature is "+degree+"</h1>");
		    res.write("<p>weather description is "+desc +"</p>");
		 	res.write("<img src="+icondata+  ">");

			res.send();
		})
	})






})

app.listen(3000,function(){
	console.log("server running in 3000 port");
})








/* working code for displaying weather data without user input*/


// const express= require("express");
// const app=express();




// // to give get request to other server and get results

// const https= require("https");// no need to install - inbuilt


// app.get("/",function(req,res){

// 	const api_key="54b17ee4d01f3615394a450b41ef69b7";
// 	const query="London";

// const url="https://api.openweathermap.org/data/2.5/weather?appid="+api_key+ "&q="+query  +"";

// https.get(url,function(response){
// 	console.log(response.statusCode);
// 	response.on("data",function(data){




// 	//	console.log(data);
// 	// this retrieves onply hexadecimal code , so 
// 		//need to convert it 

// 	const weatherdata	=JSON.parse(data);
// 	const temp=weatherdata.main.temp;
// 	const desc=weatherdata.weather[0].description; 
// 	const icon=weatherdata.weather[0].icon;
// 	var icondata="http://openweathermap.org/img/wn/"+icon +"@2x.png";
//     //res.write("<img src="+icondata+">");
//    //
//     res.write("<h1>Temperature is "+temp+"</h1>");
//     res.write("<p>weather description is "+desc +"</p>");
//  res.write("<img src="+icondata+  ">");

// 	res.send();
// 	})
// })


// //	res.send("Server up and running");


// })






// app.listen(3000,function(){
// 	console.log("server running in 3000 port");
// })
