module.exports = (grunt) => {
	grunt.config.merge({
		concat: {
			options: {
				stripBanners: true,
				banner:
					'/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			},
			js: {
				src: ['assets/js/libs/*', 'assets/js/core/app.js'].concat(
					grunt.config.get('jsFiles'),
				),
				dest: 'assets/js/theme.js',
			},
		},
	});
};
