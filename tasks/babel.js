module.exports = (grunt) => {
	grunt.config.merge({
		babel: {
			options: {
				sourceMap: false,
				presets: [
					[
						'@babel/preset-env',
						{
							modules: false,
							targets: {
								chrome: 80,
							},
						},
					],
				],
				minified: true,
				comments: false,
				plugins: [],
			},
			dist: {
				files: {
					'assets/js/theme.min.js': 'assets/js/theme.js',
				},
			},
		},
	});
};
