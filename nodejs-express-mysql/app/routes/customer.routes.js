module.exports = app => {
    const customers = require('../controllers/customer.controller');

    // Creates a new Customer
    app.post("/customers", customers.create);
    // Retrieves all Customers
    app.get("/customers", customers.findAll);
    // Retrieves a specific Customer
    app.get("/customers/:customerId", customers.findOne);
    // Updates a specific Customer
    app.put("/customers/:customerId", customers.update);
    // Deletes a specific Customer
    app.delete('/customers/:customerId', customers.delete);
    // Deletes all customers
    app.delete('/customers', customers.deleteAll);
};