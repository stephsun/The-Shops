'use strict';

var q = require('q');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var BrandModel = require('../models/Brand').model;

var renderAdminPage = function (req, res) {
    res.render('admin',
        {title: 'Admin Page'}
    );
};

var getAllBrands = function (req, res) {
    q.resolve().then(function () {
        return BrandModel.getAllBrands()
    }).then(function (brandList) {
        logger.info(brandList);
        res.send(brandList);
    }).fail(function (err) {
        next(err);
    });
}

var addBrand = function (req, res) {
    var longName = req.body.longName;
    var url = req.body.url;
    var rank = req.body.rank;
    var name = longName;    
    name =  name.replace(/[^a-zA-Z0-9]+/g,'').toLowerCase();

    q.resolve().then(function () {
        return BrandModel.addBrand(name, longName, url, rank);
    }).then(function () {
        logger.info('adding complete');
        res.status(200).json({});
    }).fail(function (err) {
        logger.error(err);
        res.status(400).json(err);
    });
}

var deleteBrand = function (req, res) {
    logger.info(req.body);
    logger.info(req.body._id);
    var id = req.body._id;

    q.resolve().then(function () {
        return q.all([
            BrandModel.deleteBrand(id),
            BrandModel.getAllBrands()
        ]);
    }).spread(function (flag, brandList) {
        res.send(brandList);
    }).fail(function (err) {
        logger.error(err);
        res.status(400).send(err);
    });
};

module.exports = {
    renderAdminPage: renderAdminPage,
    getAllBrands: getAllBrands,
    addBrand: addBrand,
    deleteBrand: deleteBrand
};
