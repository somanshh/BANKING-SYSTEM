const express = require('express');
const app = require('../app');

const {
    addTransfer,
    sendMoneyPage,
    getAllTransfers,
    deleteAll,
} = require("../controllers/transfer")

const router = express.Router();


router.route('/alltransfers').get(getAllTransfers);
router.route('/transfer/:id').post(addTransfer).get(sendMoneyPage);
// router.route('/transfer/:id');
router.route('/delete').get(deleteAll);

module.exports = router;
