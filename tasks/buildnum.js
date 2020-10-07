'use strict';

module.exports = function buildnum(grunt) {
	// Set default config
	grunt.config.merge({
		buildnum: {
			options: {
				file: 'build.json'
			}
		}
	});

	// generate build number
	grunt.registerTask('buildnum',
		'Generates and updates the current build number', function () {
			const options = this.options();
			const getBuildNumber = function () {
				let b = {};

				try {
					b = grunt.file.readJSON(options.file);
				} catch (e) { }

				b.previous = {
					lastBuild: b.lastBuild,
					svn: Object.assign({}, b.svn)
				};

				b.lastBuild = b.lastBuild > 0 ? b.lastBuild + 1 : 1;

				b.date = (new Date()).toISOString();

				grunt.file.write(options.file, JSON.stringify(b, null, 4));

				return b.lastBuild;
			};

			const buildnum = getBuildNumber();
			grunt.config.set('buildnum.num', buildnum);
			grunt.log.writeln('New build num:', buildnum);
			grunt.log.writeln('For version:', grunt.template.process('<%= pkg.version %>'));
		});
};
