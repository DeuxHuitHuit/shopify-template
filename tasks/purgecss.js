module.exports = (grunt) => {
	grunt.config.merge({
		purgecss: {
			target: {
				options: {
					content: [
						'templates/**/*.liquid',
						'snippets/**/*.liquid',
						'sections/**/*.liquid',
						'layout/**/*.liquid',
						'assets/js/**/*.js'
					],
					whitelist: [

					],
					whitelistPatterns: [
						/^is-/,
						/^has-/
					],
					whitelistPatternsChildren: [
						/^is-/,
						/^has-/
					],
					extractors: [
						{
							extractor: (content) => {
								const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
								const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
								return broadMatches.concat(innerMatches);
							},
							extensions: ['liquid', 'js']
						}
					]
				},
				files: {
					'assets/css/theme.css': ['assets/css/theme-no-purge.css']
				}
			}
		}
	});
};
