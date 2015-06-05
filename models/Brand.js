'use strict';

var q = require('q');
var bunyan = require('bunyan');
var logger = bunyan.createLogger({
    name: 'app',
    level: 'trace'
});

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    longName: {
        type: String,
        unique: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    rank: {
        type: Number,
        unique: true
    }
});

brandSchema.statics.addBrand = function (name, longName, url) {
    var brand = new this({
        name: name,
        longName: longName,
        url: url
    });
    var defer = q.defer();
    brand.save(defer.makeNodeResolver());
    return defer.promise;
}

brandSchema.statics.deleteBrand = function (url) {
    var defer = q.defer();
    this
    .findOne()
    .where({ url: url })
    .remove(defer.makeNodeResolver());
    return defer.promise;
}

brandSchema.statics.getBrand = function (name) {
    var defer = q.defer();
    this
    .findOne()
    .where({ name: name })
    .exec(defer.makeNodeResolver());
    return defer.promise;
}

brandSchema.statics.getAllBrands = function () {
    var defer = q.defer();
    this
    .find()
    .sort({rank: 'asc'})
    .exec(defer.makeNodeResolver());
    return defer.promise;
}

module.exports = {
    model: mongoose.model('Brand', brandSchema),
    schema: brandSchema
};