'use strict';

module.exports = {
	server: {
		options: {
        	jshintrc: '.jshintrc-node'
    	},
    	src: ['*.js']
	},
	site: {
		options: {
        	jshintrc: '.jshintrc-browser'
    	},
    	src: ['static/javascirpts/*.js']
	}
};