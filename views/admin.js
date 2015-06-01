'use strict';

var renderAdminPage = function (req, res) {
    res.render('admin', {
        title: 'Edit'
    });
};

module.exports = {
    renderAdminPage: renderAdminPage
};
