const mongoose = require('mongoose');

const Stat = mongoose.model(
    'Stat', new mongoose.Schema({

        userid: String,
        dinero: Number,
        fincuenta: Date,
        raza: String,
        fserver: Date

    })
);

module.exports = Stat;