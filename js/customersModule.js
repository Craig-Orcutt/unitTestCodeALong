
'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database('acme.sqlite', () => {
    console.log("Connection to db successful");
});

module.exports.getCustomers = () => {
    return [{}];
}

module.exports.addCustomer = ({firstName, lastName, city, street, state, zip, phone}) => {
    return new Promise( (resolve, reject) => {
        db.run(`INSERT INTO customers VALUES (
        null,
        "${firstName}",
        "${lastName}",
        "${city}",
        "${street}",
        "${state}",
        "${zip}",
        "${phone}"
        )`, function() {
        resolve({ id: this.lastID})
        });
    });
}

module.exports.getSingleCustomer = () => {
    return new Promise((resolve, reject) => {

        db.all(`SELECT *
        FROM customers 
        WHERE customer_id = 1 `,
        (err, data) => {
            if (err) {
                return console.log("dang", err.toString());
            }
            console.log(data);
            resolve (data);
        });
    });
}


module.exports.deleteCustomer = () => {
    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM customers
        WHERE customers.customer_id = 5`)
        db.all(`SELECT *
        FROM customers 
        `,
        (err, data) => {
            if (err) {
                return console.log("dang", err.toString());
            }
            console.log(data);
            resolve (data);
        });
    });
}