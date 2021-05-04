module.exports = (grunt) => {
	grunt.config.merge({
		watch: {
			catch: {
				files: [
					'assets/css/**/*.css',
					'tailwind.config.js',
					'assets/**/*',
					'config/*',
					'layout/*',
					'locales/*',
					'sections/*',
					'snippets/*',
					'templates/*',
					'!assets/theme.js',
					'!assets/theme.min.js'
				],
				tasks: ['postcss', 'shopify']
			},
			options: {
				spawn: false,
				livereload: true
			}
		}
	});
};
