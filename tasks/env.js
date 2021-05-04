module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		env: {
			build: {
				NODE_ENV: 'production',
				TAILWIND_MODE: 'build'
			},
			dev: {
				NODE_ENV: 'development',
				TAILWIND_MODE: 'watch'
			}
		}
	});
};
