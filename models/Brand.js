'use strict';

var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name: {
        type: String
    },
    longName: {
        type: String
    },
    url: {
        type: String
    }
});

brandSchema.statics.addBrand = function (name, longName, url) {
    var brand = new this({
        name: name,
        longName: longName,
        url: url
    });
    brand.save();
}

brandSchema.statics.getBrandUrl = function (name) {
    this
    .findOne()
    .where({ name: name })
    .exec(function (err, doc) {
        logger.info(doc.url);
    });
}

module.exports = {
    model: mongoose.model('Brand', brandSchema),
    schema: brandSchema
};