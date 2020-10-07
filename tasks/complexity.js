module.exports = (grunt) => {


	grunt.config.merge({
		complexity: {
			generic: {
				src: [],
				exclude: [
					'assets/js/utils/keys.js'
				],
				options: {
					errorsOnly: false,
					cyclomatic: 15,
					halstead: 25,
					maintainability: 90
				}
			}
		}
	});
};
