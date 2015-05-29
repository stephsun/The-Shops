'use strict';


var renderBrandPage = function (req, res) {
    var brandUrls = {
        jcrew: 'http://www.jcrew.com/index.jsp',
        af: 'http://www.abercrombie.com/shop/us',
        netaporter: 'http://www.net-a-porter.com/us/en/'
    };

    res.render('content', {
        title: req.params.brand,
        url: brandUrls[req.params.brand]
    });
};

module.exports = {
    renderBrandPage: renderBrandPage
};
