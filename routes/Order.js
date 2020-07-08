const router = require('express').Router()
const orderController = require('../controller/Order')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.post('/insert', fields, (req, res) => {
    const imageName = uploadSetting.cekNull(req.files['image'])

    const data = Object.assign(JSON.parse(req.body.data), {
        image: imageName
    })

    orderController.insert(data)
      .then(result => res.json(result))
      .catch((err) => res.json(err))
})

router.get('/getAllOrder', (req, res) => {
  orderController.getAllOrder()
    .then(result => res.json(result))
    .catch((err) => res.json(err))
})

router.get('/getorderbyuser/:id', (req, res) => {
  orderController.getOrderByUser(req.params.id)
    .then(result => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/konfirmasiOrder/:id', (req, res) => {
  orderController.konfirmasiOrder(req.params.id )
    .then(result => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/terimaorder/:id', (req, res) => {
  orderController.terimaOrder(req.params.id )
    .then(result => res.json(result))
    .catch((err) => res.json(err))
})

router.delete('/deleteorder/:id', (req, res) => {
  orderController.deleteOrder(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router