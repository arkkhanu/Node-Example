const express = require("express");
const app = express();
const mongoose = require("mongoose");

// Connection
mongoose
	.connect("mongodb://localhost/subscribers", {
		useNewUrlParser: true
	})
	.then(() => console.log("Connected to database"))
	.catch(err => console.log(err));

// Middleware app will accept only json
app.use(express.json());

// Routes
const subscribersRouter = require("./routes/subscriber");
app.use("/subscribersd", subscribersRouter);

// Listening Port
app.listen(4000, () => console.log("Server Started"));
