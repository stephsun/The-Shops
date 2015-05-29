'use strict';

var renderIndexPage = function (req, res) {
    res.render('index', {
        title: 'The Shops'
    });
};

module.exports = {
	renderIndexPage: renderIndexPage
};
