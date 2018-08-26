var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon"
});
function showItems() {
    connection.query("SELECT * FROM products", function(err, res) {
    res.forEach(function(element) {
        console.log("\n____________________")
        console.log("ID: " + element.item_id)
        console.log("Product Name: " + element.product_name)
        console.log("Department: " + element.department_name)
        console.log("Price: " + element.price)
        console.log("Stock: " + element.stock_quantity);
        console.log("_____________________")
    });
    userOptions();
  });
};

function userOptions() {
    console.log("\n")
    inquirer.prompt([{
            name: "ID",
            type: "input",
            message: "Enter Product ID:"
        },
        {
            name: "amount",
            type: "input",
            message: "Amount: "
        }
    ]).then(function (response) {
        connection.query("SELECT * FROM products WHERE item_id = ?", [response.ID], function(err, results) {
            if (err) throw err;
            if (results.length === 0 || response.amount == 0) {
                console.log("\n_____________________");
                console.log("Incorrect ID");
                console.log("Please give a valid ID");
                console.log("_____________________");
                userOptions();
            }
            else if (results[0].stock_quantity >= response.amount) {
                console.log("\n_____________________\n");
                console.log("Your total is " + results[0].price*parseInt(response.amount))
                if (response.amount == 1) {
                    console.log("Purchasing " + response.amount + " " + results[0].product_name + "...")
                }
                else {
                    console.log("Purchasing " + response.amount + " " + results[0].product_name + "'s...")
                }
                var stockQuantity = results[0].stock_quantity;
                var purchaseCount = response.amount;
                var newQuantity = stockQuantity-purchaseCount;
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id =?", [newQuantity, response.ID], function(err, results){
                    if (err) throw err;
                });
                console.log("_____________________");
                exit();
            }
            else {
                console.log("\n_____________________")
                console.log("Out of Stock! We have no " + results[0].product_name + "'s left");
                console.log("_____________________")
                exit()
            }
        });
    })
}

function exit() {
    console.log("\n_____________________\n")
    inquirer
        .prompt({
            name: 'exit',
            type: 'list',
            message: 'Would you like to continue shopping?',
            choices: ['Yes', 'No']
        })
        .then(function (res) {
            if (res.exit === 'No') {
                process.exit();
            } else {
                showItems();
                userOptions();
            }
        });
};

connection.connect(function (err) {
    if (err) throw err;
    showItems();
});