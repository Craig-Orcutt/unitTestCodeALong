
const { createTables } = require('../js/makeTable.js');
const { getCustomers, addCustomer, getSingleCustomer , deleteCustomer } = require('../js/customersModule.js');
const { assert: {equal, isFunction, isObject, isArray , hasAllKeys , notEqual} } = require('chai');

describe('just a test', () => {
    it('should be equal', () => {
        equal(3, 1+2);
    });
});

describe("customers module", () => {

    describe("getCustomers", () => {
        it('should be a function', () => {
            isFunction(getCustomers);
        });
        it('should return an array of objects', () => {
            isArray(getCustomers());
            isObject(getCustomers()[0]);
        });

    });


    describe("adding a customer", () => {
        let newCust = {
            firstName: "Pat",
            lastName: "Smith",
            city: "Nowhere",
            state: "Alabama",
            zip: "22288",
            phone: "555-444-7777"
        };

        beforeEach(done => {
            createTables()
            .then( () => {
                done(); 
            })
        })

        it('should return an object', () => {
            return addCustomer(newCust)
            .then( (data) => {
                console.log(data,"data");
                isObject(data);
            });
        });
        it("should add a new item to the db", () => {
            return addCustomer(newCust)
            .then( (obj) => {
                equal(9, obj.id);
            })
        });
    });

    describe('get one Customer', () => {
        it('should get single customer with all keys', () =>{
            return getSingleCustomer()
            .then((data) =>{
                hasAllKeys(data[0], ["customer_id", "first_name", "last_name", "city", "street","state", "zip", "phone"]);
            })
        })
    })

    describe('delete a single customer', () => {
        it('should be a function', () => {
            isFunction(deleteCustomer);
        });
        // it('should get customer by id', () => {
        //     return deleteCustomer()
        //     .then( (data) => {
        //         equal(data[0].customer_id, 5);
        //     });
        // });
        it('should remove customer from database', () =>{
            return deleteCustomer()
            .then( (data) => {
                notEqual(data[0])
            })
        })
        
    })
    


});