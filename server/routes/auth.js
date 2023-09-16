const router = require("express").Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
	console.log("I am from /login/success ");
	if (req.user) {
		// console.log("this is req1",req.user);
		// console.log("name",req.user._json.name);
		// console.log("email",req.user._json.email);
		// console.log("name",req.user._json.name);
		
		

		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		
	// console.log("this is res",res);
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

router.get("/login/failed", (req, res) => {
	console.log("I am from /login/failed ");
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

router.get("/google", (req,res,next)=>{
	console.log("I am from /google/ ")
	next();
},passport.authenticate("google", ["profile", "email"]));

router.get(
	"/google/callback",(req,res,next)=>{
		console.log("i am from google/callback");
		next();
	},
	
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	console.log("I am from /logout ");
	req.logout();
	res.redirect("http://localhost:3000");
});

module.exports = router;
