module.exports = (grunt) => {
	grunt.config.merge({
		watch: {
			css: {
				files: [
					'assets/css/**/*.css',
					'tailwind.config.js'
				],
				tasks: ['postcss', 'shopify']
			},
			catch: {
				files: [
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
				tasks: ['shopify']
			},
			options: {
				spawn: false,
				livereload: false
			}
		}
	});
};
