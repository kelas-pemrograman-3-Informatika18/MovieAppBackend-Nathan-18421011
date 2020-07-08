const orderModel = require('../model/Order')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.insert = (data) =>
    new Promise((resolve, reject) => {
        orderModel.create(data)
        .then(() => resolve(requestResponse.sukses('Proses Transaksi Berhasil')))
        .catch(() => reject(requestResponse.serverError))
    })

exports.getAllOrder = () =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $lookup: {
                    from: "movies",
                    localField: "idFilm",
                    foreignField: "_id",
                    as: "dataMovie"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "idUser",
                    foreignField: "_id",
                    as: "dataUser"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse(serverError)))
    })

exports.getOrderByUser = (id) =>
    new Promise((resolve, reject) => {
        orderModel.aggregate([
            {
                $match: {
                    idUser: objectId(id)
                }
            },
            {
                $lookup: {
                    from: "movies",
                    localField: "idFilm",
                    foreignField: "_id",
                    as: "dataMovie"
                }
            }
        ]).then(res => {
            resolve(requestResponse.suksesWithData(res))
        }).catch(() => reject(requestResponse(serverError)))
    })

exports.konfirmasiOrder = (id) =>
    new Promise((resolve, reject) => {
        try {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 2
        }).then(() => resolve(requestResponse.sukses('Berhasil Konfirmasi Order')))
        .catch(() => reject(requestResponse.serverError))
        }   catch (error) {
            console.log(error)
        }    
    })

exports.terimaOrder = (id) =>
    new Promise((resolve, reject) => {
        try {
        orderModel.updateOne({
            _id: objectId(id)
        },
        {
            status: 3
        }).then(() => resolve(requestResponse.sukses('Order Diterima')))
        .catch(() => reject(requestResponse.serverError))
        }   catch (error) {
            console.log(error)
        }    
    })

exports.deleteOrder = (id) =>
    new Promise((resolve, reject) => {
        orderModel.findOne({
            _id: objectId(id)
        }).then(order => {
            orderModel.deleteOne({
            _id: objectId(id)
        }).then(() => {
            resolve(requestResponse.sukses('Berhasil Menghapus'))
        }).catch(() => reject(requestResponse.serverError))
    })
})