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
            title: 'Edit',
            brands: brandList
        });
    }).fail(function (err) {
        next(err);
    });
};

var addBrand = function (req, res) {
    var longName = req.body.longName;
    var url = req.body.url;
    var name = longName.toLowerCase();

    q.resolve().then(function () {
        return BrandModel.addBrand(name, longName, url);
    }).then(function (brand) {
        return BrandModel.getAllBrands().then(function (brandList) {
            res.render('admin', {
                title: 'Edit',
                brands: brandList,
                isSuccessful: true,
                message: 'Added sucessfully'
            });
        });
    }).fail(function () {
        return BrandModel.getAllBrands().then(function(brandList) {
            logger.info(brandList)
            res.render('admin', {
                title: 'Edit',
                brands: brandList,
                isSuccessful: false,
                message: 'Added failed',
            });
        });
    });
}

module.exports = {
    renderAdminPage: renderAdminPage,
    addBrand: addBrand
};
