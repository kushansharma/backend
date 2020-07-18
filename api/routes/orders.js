const express = require('express')
const router = express.Router()
 
const checkAuth = require('../middleware/check-auth')

const orderController = require('../controller/orders')


router.get('/', checkAuth, orderController.orders_get_all)

router.post('/', checkAuth, orderController.order_create)


router.get('/:orderId', checkAuth, orderController.orders_get_order)

router.delete('/:orderId', checkAuth, orderController.order_delete)

module.exports = router