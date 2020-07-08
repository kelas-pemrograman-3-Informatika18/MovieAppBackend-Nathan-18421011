const userModel = require('../model/User')
const bcrypt = require('bcrypt')
const { requestResponse } = require('../config')
const objectId = require('mongoose').Types.ObjectId

exports.register = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then(user => {
            if (user) {
                resolve(requestResponse.gagal('Username Sudah Terdaftar'))
            } else {
                bcrypt.hash(data.password, 10, (err, hash) => {
                    data.password = hash
                    userModel.create(data)
                        .then(() => resolve(requestResponse.sukses('Berhasil Registrasi')))
                        .catch(() => reject(requestResponse.serverError))
                })
            }
        })
    })

exports.login = (data) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            username: data.username
        }).then((user) => {
            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    resolve(requestResponse.suksesLogin(user))
                } else {
                    reject(requestResponse.gagal('Password Salah'))
                }
            } else {
                reject(requestResponse.gagal('Username Tidak Terdaftar'))
            }
        })
    })

exports.getAllUser = () =>
    new Promise((resolve, reject) => {
        userModel.find({
            level: 2
        }).then(user => {
            resolve(requestResponse.suksesWithData(user))
        }).catch(() => reject(requestResponse.serverError))
    })

exports.deleteUser = (id) =>
    new Promise((resolve, reject) => {
        userModel.findOne({
            _id: objectId(id)
        }).then(user => {
            userModel.deleteOne({
            _id: objectId(id)
        }).then(() => {
            resolve(requestResponse.sukses('Berhasil Menghapus'))
        }).catch(() => reject(requestResponse.serverError))
    })
})