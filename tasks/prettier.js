module.exports = (grunt) => {
	grunt.config.merge({
		prettier: {
			files: {
				src: grunt.config.get('jsFiles'),
			},
		},
	});
};
