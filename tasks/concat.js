module.exports = (grunt) => {

	grunt.config.merge({
		concat: {
			options: {
				stripBanners: true,
				banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			css: {
				src: ['assets/css/pre-build/**/*.css'],
				dest: 'assets/css/theme-no-purge.css'
			},
			js: {
				src: ['assets/js/libs/*'].concat(grunt.config.get('jsFiles')),
				dest: 'assets/js/theme.js'
			}
		}
	});
};
