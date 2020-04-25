const db = require('../models');

const Stat = db.stats;


exports.allAccess = (req, res) => {


    Stat.findOne({ userid: req.userId }, (err, stad) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        //  const confecha= JSON.parse(stad);
        stad.fserver = new Date();
        console.log(stad);

        res.status(200).send(stad);
    });



};

exports.userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
    res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send('Moderator Content.');
};