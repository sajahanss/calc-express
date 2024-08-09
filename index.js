const express=require("express");
const bodyparser=require("body-parser");
const path=require("path");
const app=express();
var cons=require("consolidate");
const port=8080;
var urlencodedparser=bodyparser.urlencoded({extended: true})
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'..','/calcu')))

var user={Results:0};

//localhost index page rendering
app.get('/',(req,res)=>{
	user={Results:0};
	res.sendFile(path.join(__dirname,'index.html'))
	
})

//getting output vlue from html file by using post method
app.post('/',urlencodedparser,(req,res)=>{
	console.log(req.body);
    user={Results:req.body.result};
	res.redirect('/')
});

//Sending Data To Html to print output
app.get('/saj',(req,res)=>{
	res.json(user);
})

// calculaton through POSTMAN app
app.post("/clc", (req, res) => {
	const { num1, num2 } = req.body;

	if (num1 === undefined || num2 === undefined) {
		return res
			.status(400)
			.json({
				error: "Both num1 and num2 are required in the request body.",
			});
	}

	const Result = num1 + num2;
	res.json({ Result });
});


//listening port
app.listen(port,()=>{
    console.log(`Listening Port Number http://localhost:${port}`);
})