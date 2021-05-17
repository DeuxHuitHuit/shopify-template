module.exports = (grunt) => {
	grunt.config.merge({
		csso: {
			compress: {
				options: {
					report: 'gzip',
					filename: 'theme.min.css',
				},
				files: {
					'assets/css/theme.min.css': ['assets/css/pre-build/main.css'],
				},
			},
		},
	});
};
