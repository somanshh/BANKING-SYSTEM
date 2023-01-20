const Customer = require('../models/customers')

exports.getAllCustomers = async(req,res)=>{
    try {

        const customers = await Customer.find({}, {transferHistory:0,recievedHistory:0,transferedBalance:0,recievedBalance:0});

        res.status(201).render('showall',{customers});
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
exports.customerById = async(req,res)=>{
    try {

        const customer = await Customer.findById(req.params.id);


        res.status(201).render('showone', {customer});
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.myProfile = async(req,res)=>{
    try {

        const customer = await Customer.find({email:req.body.email});

        res.status(200).json({
            success: true,
            customer
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




exports.addCustomer = async(req,res)=>{
    try {

        const {name, email} = req.body;

        const newCustomer = await Customer.create({name,email});

        res.status(201).json({
            success: true,
            message: "Customer Added"
        })
        
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}