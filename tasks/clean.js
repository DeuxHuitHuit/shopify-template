module.exports = (grunt) => {
	grunt.config.merge({
		clean: {
			css: ['assets/css/pre-build/**/*.*'],
			js: ['assets/js/libs/*.*'],
		},
	});
};
