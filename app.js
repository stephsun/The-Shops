var express = require('express');
var app = express()
var hbs = require('hbs');
var path = require('path');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views/templates'));

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

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static('static'));


app.get('/', function (req, res) {
    res.render('index', {
        title: 'The Shops'
    });
})

app.get('/:brand', function (req, res) {
    var brands = {
        jcrew: 'http://www.jcrew.com/index.jsp',
        af: 'http://www.abercrombie.com/shop/us',
        netaporter: 'http://www.net-a-porter.com/us/en/'
    };

    console.log(req.params.brand);

    res.render('content', {
        title: req.params.brand,
        url: brands[req.params.brand]
    });
})

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at https://%s:%s', host, port);
})
