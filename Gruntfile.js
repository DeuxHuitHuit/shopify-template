const findUsedJsFiles = (grunt) => {
	const file = grunt.file.read('snippets/js-modules.liquid', 'utf8');
	const regex = /'([0-9a-zA-Z\-_\.]*.js)' \| asset_url/gm;

	let jsFiles = [];
	let m;
	while ((m = regex.exec(file)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		jsFiles.push(`assets/js/**/${m[1]}`);
	}

	return jsFiles;
};

const findUsedJsLibs = (grunt) => {
	const file = grunt.file.read('snippets/js.liquid', 'utf8');
	const regex = /src="(http[0-9a-zA-Z\-_\.\/:]*)*"/gm;

	let jsFiles = [];
	let m;
	while ((m = regex.exec(file)) !== null) {
		if (m.index === regex.lastIndex) {
			regex.lastIndex++;
		}
		jsFiles.push(`${m[1]}`);
	}

	return jsFiles;
};

module.exports = function (grunt) {
	let shopifyConfig = grunt.file.readJSON('config.json', 'utf8');

	grunt.initConfig({
		jsFiles: findUsedJsFiles(grunt),
		jsLibs: findUsedJsLibs(grunt),
		theme: grunt.file.readJSON('config/settings_schema.json', 'utf8')[0],
		pkg: grunt.file.readJSON('package.json'),
		install: {
			options: {
				env: ['default', 'staging', 'production'],
			},
		},
		shopify: {
			options: {
				auth: shopifyConfig,
				files: [
					'assets/theme.min.js',
					'assets/theme.js',
					'assets/theme.min.css',
					'assets/theme.css',
					'assets/**/*',
					'config/*',
					'layout/*',
					'locales/*',
					'sections/*',
					'snippets/*',
					'templates/*',
				],
			},
		},
	});

	const tasks = grunt.file.expand({ filter: 'isFile', cwd: 'tasks' }, ['*']);

	tasks.forEach((task) => {
		require(`./tasks/${task}`)(grunt);
	});

	grunt.event.on('watch', function (action, filepath) {
		grunt.config.set('shopify.options.files', filepath.replace(/\\/g, '/'));
		grunt.config.set('shopify.options.mode', action);
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-csso');
	grunt.loadNpmTasks('grunt-env');
	grunt.loadNpmTasks('grunt-complexity');
	grunt.loadNpmTasks('grunt-prettier');

	grunt.registerTask('dev-js', ['complexity', 'prettier', 'jshint']);
	grunt.registerTask('dev', ['dev-js']);

	grunt.registerTask('js', ['dev-js', 'clean:js', 'libs', 'concat:js', 'babel', 'headers:js']);
	grunt.registerTask('css', ['clean:css', 'postcss', 'csso', 'headers:css']);
	grunt.registerTask('build', ['env:build', 'css', 'js']);

	grunt.registerTask('deploy', ['build', 'shopify:deploy']);
	grunt.registerTask('deploy:staging', ['build', 'shopify:deploy:staging']);
	grunt.registerTask('deploy:prod', ['build', 'shopify:deploy:production']);
	grunt.registerTask('init', ['install', 'deploy']);

	grunt.registerTask('default', ['env:dev', 'watch']);
};
