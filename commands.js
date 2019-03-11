#!/usr/bin/env node

const program = require("commander");
const { prompt } = require("inquirer");
const {
	addCustomer,
	findCustomer,
	updateCustomer,
	removeCustomer,
	listCustomer
} = require("./app");

// Customer Questions (Inquirer)
const questions = [
	{
		type: "input",
		name: "firstname",
		message: "First Name:"
	},
	{
		type: "input",
		name: "lastname",
		message: "Last Name:"
	},
	{
		type: "input",
		name: "phone",
		message: "Phone Number:"
	},
	{
		type: "input",
		name: "email",
		message: "Email Address:"
	}
];

program.version("1.0.0", "-v, --version").description("Client Management System");

// ********************************************************************************************************************
// Normal Method
// ********************************************************************************************************************
// program
// 	.command("add <firstname> <lastname> <phone> <email>")
// 	.alias("a")
// 	.description("Add a customer")
// 	.action((firstname, lastname, phone, email) => {
// 		addCustomer({ firstname, lastname, phone, email }).catch((err) => {
// 			console.log("ERROR in addCustomer Method => " + err);
// 		});
// 	});
// ********************************************************************************************************************

// Add Command
program
	.command("add")
	.alias("a")
	.description("Add a customer")
	.action(() => {
		console.log(
			"We will be asking you some details, If you want to quit press 'Ctrl + C'"
		);
		prompt(questions)
			.then((answers) => {
				addCustomer(answers);
			})
			.catch((err) => {
				console.log("ERROR in prompt() Function => ", err);
			});
	});

// Find Command
program
	.command("find <name>")
	.alias("f")
	.description("Find a customer")
	.action((name) => {
		findCustomer(name);
	});

// Update Command
program
	.command("update <_id>")
	.alias("u")
	.description("Update a customer")
	.action((_id) => {
		console.log(
			"We will be asking you some details, If you want to quit press 'Ctrl + C'"
		);
		prompt(questions)
			.then((answers) => {
				updateCustomer(_id, answers);
			})
			.catch((err) => {
				console.log("ERROR in prompt() Function => ", err);
			});
	});

// Remove Command
program
	.command("remove <_id>")
	.alias("r")
	.description("Remove a customer")
	.action((_id) => {
		removeCustomer(_id);
	});

// List Command
program
	.command("list")
	.alias("l")
	.description("List all customers")
	.action(() => {
		listCustomer();
	});

program.parse(process.argv);
