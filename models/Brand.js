'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BrandSchema = new Schema({
	name: {
		type: String
	},
	url: {
		type: String
	}
});

module.exports = {
	model: mongoose.model('Brand', BrandSchema),
	schema: BrandSchema
};