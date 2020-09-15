const { resume } = require('./db');
const sql = require('./db');

const Customer = function(customer) {
    this.email = customer.email;
    this.name = customer.name;
    this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO customers SET ?", newCustomer, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(err,null);
            return;
        }

        console.log("created customer: ", { id: res.insertId, ...newCustomer});
        result(null, { id: res.insertId, ...newCustomer});
    });
};

Customer.findById = (customerId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err,res) => {
        if(err) {
            console.log("error: ",err);
            result(err,null);
            return;
        }

        if(res.length) {
            console.log("Found Customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Customer with id
        result({ kind: "not_found"}, null);
    });
};

Customer.getAll = result => {
    sql.query("SELCT * FROM customers" , (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }

        console.log("customers: ", res);
        result(null,res);
    });
};

Customer.updateById = (id, customer, result) => {
    sql.query(
        "UPDATE customers SET email =?, name =?, active =? WHERE id = ?",
        [customer.email, customer.name, customer.active, id],
        (err,res) => {
            if(err) {
                console.log("error: ", err);
                result(null,err);
                return;
            }

            if(res.affectedRows == 0) {
                //Customer not found with the ID
                result({ kind: "not_found"}, null);
                return;
            }

            console.log("updated customer: ", { id: id, ...customer});
            result(null, {id: id, ...customer});
        }
    );
};

Customer.remove = (id, result) => {
    sql.query("DELET FROM customers WHERE id = ?", id, (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }

        if(res.affectedRows == 0) {
            //Customer not found with ID
            result({ kind: not_found},null);
            return;
        }

        console.log("Deleted customer with ID: ", id);
        result(null,res);
    });
};

Customer.removeAll = result => {
    sql.query("DELETE FROM customers", (err,res) => {
        if(err) {
            console.log("error: ", err);
            result(null,err);
            return;
        }

        console.log(`Deleted ${res.affectedRows} customers`);
        result(null,res);
    });
};

module.exports = Customer;