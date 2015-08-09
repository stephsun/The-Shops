'use strict';

var q = require('q');

var renderIndexPage = function (req, res) {
    res.render('index');
};

module.exports = {
    renderIndexPage: renderIndexPage
};
