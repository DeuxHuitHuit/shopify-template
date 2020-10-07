const postcss = require('postcss');

module.exports = (grunt) => {
	'use strict';

	grunt.config.merge({
		postcss: {
			options: {
				processors: [
					require('postcss-import')(),
					require('postcss-nested')(),
					require('tailwindcss')(),
					require('autoprefixer')()
				],
				files: {
					src: [
						'assets/css/main.css'
					],
					dist: 'assets/css/pre-build',
					root: `assets/css`
				}
			}
		}
	});

	grunt.registerTask('postcss', 'Rewrite css with provided plugins', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();
		const files = grunt.file.expand(options.files.src);

		for (let index = 0; index < files.length; index++) {
			const file = files[index].replace(options.files.root, '');
			const fileContent = grunt.file.read(options.files.root + file);
			const filename = file.split('/').pop();
			const destination = `${options.files.dist}${file.replace(filename, filename.split('.')[0])}.css`;

			await postcss(options.processors).process(fileContent, {
				from: files[index]
			}).then((r) => {
				grunt.file.write(destination, r.css, {
					encoding: 'UTF-8'
				});
			}).catch((error) => {
				grunt.log.error(error);
			});
		}

		done();
	});
};
