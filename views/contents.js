'use strict';

var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});
var q = require('q');

var renderBrandPage = function (req, res) {
    var name = req.params.brand;
    var BrandModel = require('../models/Brand').model;
    
    q.resolve().then(function () {
        return q.all([
            BrandModel.getBrand(name),
            BrandModel.getAllBrands()
        ]);
    }).spread(function (brand, brandList) {
        res.render('content', {
            title: brand.longName,
            url: brand.url,
            brands: brandList
        });
        logger.info(brandList);
        // TODO: handle doc not found
    }).fail(function (err) {
        next(err);
        // TODO: 404, 500 pages handlers
    });
};

module.exports = {
    renderBrandPage: renderBrandPage
};
