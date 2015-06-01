'use strict';

var renderIndexPage = function (req, res) {
    res.render('index', {
        title: 'The Shops',
        url: 'https://www.jcrew.com/index.jsp'
    });
};

module.exports = {
	renderIndexPage: renderIndexPage
};
