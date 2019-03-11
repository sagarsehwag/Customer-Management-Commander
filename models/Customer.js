const mongoose = require("mongoose");

// Customer Schema
const CustomerSchema = mongoose.Schema({
	firstname: { type: String },
	lastname: { type: String },
	phone: { type: String },
	email: { type: String }
});

// Define & Export
module.exports = mongoose.model("Customer", CustomerSchema);
