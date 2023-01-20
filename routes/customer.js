const express = require('express');

const {
    getAllCustomers,
    addCustomer,
    customerById
    
} = require('../controllers/customer')

const router = express.Router();


router.route("/allcustomers").get(getAllCustomers)
router.route("/customer/:id").get(customerById)
router.route("/addcustomer").post(addCustomer)



module.exports = router;