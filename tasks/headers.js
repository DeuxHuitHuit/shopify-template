module.exports = (grunt) => {

	grunt.config.merge({
		headers: {
			options: {
				content: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
					'build <%= buildnum.num ? buildnum.num : "x" %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
					' * Copyright (c) <%= grunt.template.today("yyyy") %> ' +
					'<%= pkg.author.name %> (<%= pkg.author.url %>);\n' +
					' * <%= pkg.license %>\n */\n'
			},
			js: ['assets/js/theme.min.js'],
			css: ['assets/css/theme.min.css'],
		}
	});

	grunt.registerTask('headers', 'append comments at top of files', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();
		const env = grunt.config.get('headers')[grunt.task.current.args[0]];
		const files = grunt.file.expand(env);


		for (let index = 0; index < files.length; index++) {
			const filePath = files[index];
			const fileContent = options.content + grunt.file.read(filePath);
			grunt.file.write(filePath, fileContent);
		}

		done();
	});
};
