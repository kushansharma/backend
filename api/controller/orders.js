const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select('_id product quantity')
        .populate('product', 'name')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                order: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost/3000/orders/' + doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.order_create = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                product: req.body.productId,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: 'Order Placed',
                placedOrder: {
                   _id: result._id,
                   product: result.product,
                   quantity: result.quantity
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/orders/" + result._id
                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
}

exports.orders_get_order = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate('product')
        .exec()
        .then(order => {
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
}

exports.order_delete = (req, res, next) => {
    Order.remove({ _id: req.params.orderId})
        .exec()
        .then(order => {
            if(!order) {
                res.status(404).json({
                    message: 'Order not found'
                })
            }
            res.status(200).json({
                order: order,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err =>{
            res.status(500).json({
                error: err
            })
        })
}