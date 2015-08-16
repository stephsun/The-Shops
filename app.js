'use strict';

var express = require('express');
var hbs = require('hbs');
var path = require('path');
var bodyParser = require('body-parser');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'templates'));

var blocks = {};

hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

hbs.registerPartials(path.join(__dirname, 'templates/partials'));

app.use(express.static('static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

app.get('/', require('./views/index').renderIndexPage);
app.get('/brand/:brand', require('./views/contents').renderBrandPage);
app.get('/admin', require('./views/admin').renderAdminPage);
app.get('/admin/all', require('./views/admin').getAllBrands);
app.post('/admin/all', require('./views/admin').addBrand);
app.post('/admin/edit', require('./views/admin').editBrand);

var server = app.listen(process.env.PORT, function () {

    var host = server.address().address;
    var port = server.address().port;

    logger.info('Example app listening at https://%s:%s', host, port);
});
