module.exports = function shopify (grunt) {
	'use strict';

	const isBinary = require('isbinaryfile');
	const axios = require('axios');

	grunt.registerTask('shopify', 'Sync files with Shopify', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();

		const url = `https://${options.myshopify}/admin/api/2020-04/themes/${options.theme_id}/assets.json`;

		if (typeof options.files === 'string') {
			options.files = [options.files];
		}

		for (let index = 0; index < options.files.length; index++) {
			let file = options.files[index];
			let key = file.split('/')[0] + '/' + file.split('/')[file.split('/').length - 1];

			if (!!key.endsWith('.less')) {
				key = 'assets/theme.min.css';
				file = 'assets/theme.min.css';
			}

			let response = null;
			const auth = 'Basic ' + Buffer.from(options.api_key + ':' + options.password).toString('base64');

			try {
				if (options.mode === 'deleted') {
					response = await axios({
						method: 'DELETE',
						url: url + '?asset[key]=' + key,
						headers: {
							'Authorization': auth
						}
					});
				} else {
					let data = {
						asset: {
							key: key
						}
					};

					const isBytes = !!isBinary.isBinaryFileSync(file);

					data.asset[!!isBytes ? 'attachment' : 'value'] = grunt.file.read(file, { encoding: isBytes ? 'base64' : 'utf8' });

					response = await axios({
						method: 'PUT',
						url: url,
						data: data,
						headers: {
							'Authorization': auth
						}
					});
				}
			} catch (error) {
				grunt.log.error(file + ': ' + error.response.data.errors.asset[0]);
				done();
				return;
			}

			grunt.log.ok(file + ': uploaded');
		}

		done();
	});
};
