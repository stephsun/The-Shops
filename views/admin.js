'use strict';

var q = require('q');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var BrandModel = require('../models/Brand').model;

var renderAdminPage = function (req, res) {
    q.resolve().then(function () {
        return BrandModel.getAllBrands()
    }).then(function (brandList) {
        res.render('admin', {
            title: 'Admin Page',
            brands: brandList
        });
    }).fail(function (err) {
        next(err);
    });
};

var editBrand = function (req, res) {
    var action = req.body.action;
    var id = req.body.id;
    var name = req.body.name;
    var longName = req.body.longName;
    var url = req.body.url;
    var rank = req.body.rank;

    q.resolve().then(function () {
        if (action === 'edit') {
            return BrandModel.addBrand(name, longName, url);
        } else if (action === 'delete') {
            return BrandModel.deleteBrand(id);
        }
    }).then(function () {
        res.status(200).send();
    }).fail(function (err) {
        res.status(500).send(err);
    });
};

module.exports = {
    renderAdminPage: renderAdminPage,
    editBrand: editBrand
};
