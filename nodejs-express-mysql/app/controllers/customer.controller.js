const Customer = require('../models/customer.model');

exports.create = (req,res) => {
    // First Validate the request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a customer
    const customer = new Customer({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active
    });

    // Saving the customer in the DB
    Customer.create(customer, (err,data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Customer."
            });
        else res.send(data);
    });
};

exports.findAll = (req,res) => {
    Customer.getAll((err,data) => {
        if(err)
        res.status(500).send({
            message:
                err.message || "Some error occured while retrieving customers."
        });
        else res.send(data);
    });
};

exports.findOne = (req,res) => {
    Customer.findOne(req.params.customerId, (err,data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `No Customer found with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retreiving Customer with id " + req.params.customerId
                });
            }
        } else res.send(data);
    });
};

exports.update = (req,res) => {
    // Validate the request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.customerId,
        new Customer(req.body),
        (err,data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send({
                        message: `No Customer found with id ${req.params.customerId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.customerId
                    });
                }
            } else res.send(data);
        }
    );
};

exports.delete = (req,res) => {
    Customer.remove(req.params.customerId, (err,data) => {
        if(err) {
            if(err.kind === "not_found") {
                res.status(404).send({
                    message: `No Customer found with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could no delete Customer with id " + req.params.customerId
                });
            }
        } else res.send({ message: `Customer was deleted Successfully!`});
    });
};

exports.deleteAll = (req,res) => {
    Customer.removeAll((err,data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occured with removing all customers"
            });
        else res.send({ message: `All customers were deleted successfully`});
    });
};