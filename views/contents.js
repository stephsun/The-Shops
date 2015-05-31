'use strict';

var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var renderBrandPage = function (req, res) {
    var name = req.params.brand;
    var BrandModel = require('../models/Brand').model;
    
    q.resolve().then(function () {
        return BrandModel.getBrand(name);
    }).then(function (doc) {
        res.render('content', {
            title: doc.longName,
            url: doc.url
        });
    }).fail(function (err) {
        next(err);
    });
};

module.exports = {
    renderBrandPage: renderBrandPage
};
