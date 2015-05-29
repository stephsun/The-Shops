'use strict';

var express = require('express');
var hbs = require('hbs');
var path = require('path');

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

app.get('/', require('./apis/index').renderIndexPage);
app.get('/:brand', require('./apis/contents').renderBrandPage);

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at https://%s:%s', host, port);
});
