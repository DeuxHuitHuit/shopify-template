const findUsedJsFiles = (grunt) => {
	const file = grunt.file.read('snippets/js.liquid', 'utf8');
	const regex = /'([a-zA-Z\-_]*.js)' \| asset_url/gm;

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

module.exports = function (grunt) {
	// Files
	let shopifyConfig = grunt.file.readJSON('config.json', 'utf8');
	const jsFiles = findUsedJsFiles(grunt);

	const banner = '/* <%= theme.theme_name %> - <%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */';

	grunt.initConfig({
		theme: grunt.file.readJSON('config/settings_schema.json', 'utf8')[0],
		pkg: grunt.file.readJSON('package.json'),
		install: {
			options: {
				env: ['default', 'staging', 'production']
			}
		},
		shopify: {
			options: {
				auth: shopifyConfig,
				files: [
					'assets/theme.min.js',
					'assets/theme.min.css',
					'assets/**/*',
					'config/*',
					'layout/*',
					'locales/*',
					'sections/*',
					'snippets/*',
					'templates/*'
				]
			}
		},
		less: {
			development: {
				options: {
					banner: banner,
					compress: true
				},
				files: {
					'assets/theme.min.css': 'assets/css/theme.less'
				}
			}
		},
		jshint: {
			files: jsFiles
		},
		uglify: {
			options: {
				banner: banner
			},
			dist: {
				files: {
					'assets/theme.min.js': ['assets/theme.js']
				}
			}
		},
		concat: {
			options: {
				separator: '\n'
			},
			dist: {
				src: jsFiles,
				dest: 'assets/theme.js'
			}
		},
		watch: {
			css: {
				files: ['assets/css/**/*.less'],
				tasks: ['less', 'shopify']
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
					'!assets/theme.min.css',
					'!assets/theme.css',
					'!assets/theme.min.js'
				],
				tasks: ['shopify']
			},
			options: {
				spawn: false,
				livereload: true,
				livereloadOnError: true
			}
		}
	});

	const tasks = grunt.file.expand({ filter: 'isFile', cwd: 'tasks' }, ['*']);

	tasks.forEach(task => {
		require(`./tasks/${task}`)(grunt);
	});

	grunt.event.on('watch', function (action, filepath) {
		grunt.config.set('shopify.options.files', filepath.replace(/\\/g, '/'));
		grunt.config.set('shopify.options.mode', action);
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['less', 'jshint', 'concat', 'uglify']);
	grunt.registerTask('deploy', ['build', 'shopify:deploy']);
	grunt.registerTask('deploy:staging', ['build', 'shopify:deploy:staging']);
	grunt.registerTask('deploy:prod', ['build', 'shopify:deploy:production']);
	grunt.registerTask('init', ['install', 'deploy']);
};
