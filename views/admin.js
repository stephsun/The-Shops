'use strict';

var q = require('q');

var renderAdminPage = function (req, res) {
    var BrandModel = require('../models/Brand').model;

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

module.exports = {
    renderAdminPage: renderAdminPage
};
