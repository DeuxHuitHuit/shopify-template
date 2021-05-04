const axios = require('axios');

module.exports = (grunt) => {
	grunt.config.merge({
		libs: {
			options: {
				dest: ['assets/js/libs'],
				libs: grunt.config.get('jsLibs'),
			},
		},
	});

	grunt.registerTask('libs', 'Fetch all libs at cdns inside js.json', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();

		for (let index = 0; index < options.libs.length; index++) {
			const lib = options.libs[index];
			const filename = lib.split('/').pop();
			try {
				const r = await axios.get(lib);

				if (r.status === 200) {
					grunt.log.writeln(`Fetched ${lib}`);
					grunt.file.write(`assets/js/libs/${filename}`, r.data);
				} else {
					grunt.log.error(`Error while fetching ${lib}`);
				}
			} catch (err) {
				console.log(err.message);
			}
		}

		done();
	});
};
