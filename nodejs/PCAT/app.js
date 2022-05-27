const express = require("express");
const mongoose = require("mongoose");

const Photo = require("./models/Photo");

const app = express();

// connect DB
mongoose.connect("mongodb://localhost/pcat-test-db");

// TEMPLATE ENGINE
app.set("view engine", "ejs");

// MIDDLEWARES
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get("/", async (req, res) => {
	const photos = await Photo.find({});
	res.render("index", {
		photos: photos,
	});
});

app.get("/about", (req, res) => {
	res.render("about");
});

app.get("/add-photo", (req, res) => {
	res.render("add-photo");
});

app.post("/photos", async (req, res) => {
	await Photo.create(req.body);
	res.redirect("/");
});

const port = 3000;
app.listen(port, () => {
	console.log(`App listening on port ${port}!`);
});
