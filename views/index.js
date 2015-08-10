'use strict';

var q = require('q');

var renderIndexPage = function (req, res) {
	var BrandModel = require('../models/Brand').model;

    q.resolve().then(function () {
		return BrandModel.getAllBrands();
	}).then(function (brandList) {
		res.render('index', {
        	title: 'Home',
        	brands: brandList
    	});
	}).fail(function (err) {
		next(err);
	});
};


module.exports = {
    renderIndexPage: renderIndexPage
};
