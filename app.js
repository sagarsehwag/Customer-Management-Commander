const mongoose = require("mongoose");

// Map Mongoose Promise
mongoose.Promise = global.Promise;

// Mongoose Connection
mongoose
	.connect("mongodb://localhost:27017/customercli", {
		useNewUrlParser: true
	})
	.then(() => {
		// console.log("MongoDB Connected via Mongoose");
	})
	.catch((err) => {
		console.log("Mongoose Connection Error => " + err);
	});
// Accessing the default connection that has been made by the .connect() method
const db = mongoose.connection;

// Importing Models
const Customer = require("./models/Customer");

// Add Customer
const addCustomer = async (customer) => {
	await new Customer(customer).save();
	console.info("New Customer Added");
	db.close(() => {
		console.log("MongoDB Disconnected via Mongoose");
	});
};

// Find Customer
const findCustomer = async (name) => {
	// Make Case Insensitive
	const search = new RegExp(name, "i");
	await Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
		(customer) => {
			console.info(customer);
			console.info(`${customer.length} Matches`);
		}
	);
	db.close();
};

// Update Customer
const updateCustomer = (_id, customer) => {
	Customer.updateOne({ _id }, customer)
		.then((customer) => {
			console.info("Customer Updated");
			db.close();
		})
		.catch((err) => {
			console.warn("ERROR in updateCustomer() Function => ", err);
		});
};

// Remove Customer
const removeCustomer = (_id) => {
	Customer.deleteOne({ _id })
		.then((customer) => {
			console.info("Customer Removed");
			db.close();
		})
		.catch((err) => {
			console.warn("ERROR in removeCustomer() Function => ", err);
		});
};

// List Customers
const listCustomer = () => {
	Customer.find()
		.then((customers) => {
			console.info(customers);
			console.info(`${customers.length} customers`);
			db.close();
		})
		.catch((err) => {
			console.warn("ERROR in listCustomer() Function => ", err);
		});
};

module.exports = {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	listCustomer
};
