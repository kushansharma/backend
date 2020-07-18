const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/')
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname)//new Date().toISOString() +
    } 
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    }
})

const productController = require('../controller/products')
 
router.get('/', productController.products_get_all)

router.post('/', checkAuth, upload.single('productImage'), productController.product_create)

router.get('/:productid', productController.products_get_product)

router.patch('/:productid', checkAuth, productController.product_update)

router.delete('/:productid', productController.product_delete)

module.exports = router