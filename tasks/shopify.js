module.exports = function shopify(grunt) {
	'use strict';

	const isBinary = require('isbinaryfile');
	const axios = require('axios');

	const sleep = async (time) => {
		return new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	};

	const shopifyAuth = (options) => {
		const auth = 'Basic ' + Buffer.from(options.auth.api_key + ':' + options.auth.password).toString('base64');
		return {
			headers: {
				'Authorization': auth
			}
		};
	};

	const shopifyRequest = (key, file, fx, env) => {
		const data = {
			asset: {
				key: key
			}
		};

		if (!!file.endsWith('.less')) {
			file = './assets/theme.min.css';
		}

		const isBytes = !!isBinary.isBinaryFileSync(file);
		data.asset[!!isBytes ? 'attachment' : 'value'] = grunt.file.read(file, { encoding: isBytes ? 'base64' : 'utf8' });

		if (fx === 'deploy' && key === 'snippets/js.liquid' && env != 'default') {
			data.asset.value = '{{ \'theme.min.js\' | asset_url | script_tag }}\n';
		}

		return data;
	};

	const generateKey = (file) => {
		const filePath = file.replace('./', '').split('/');
		let folder = filePath[0];
		let filename = filePath[filePath.length - 1];

		if (!!filename.endsWith('.less')) {
			filename = 'theme.min.css';
		}

		if (folder !== 'assets') {
			folder = filePath.slice(0, -1).join('/');
		}

		return folder + '/' + filename;
	};

	grunt.registerTask('shopify', 'Sync files with Shopify', async (fx, env, file) => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();

		options.auth = options.auth[env] || options.auth['default'];

		const url = `https://${options.auth.myshopify}/admin/api/2020-04/themes/${options.auth.theme_id}/assets.json`;

		options.files = file || options.files || [];

		if (typeof options.files === 'string') {

			if (options.files.split('.').length === 1) {
				grunt.log.writeln(`${options.files} not a file. Skipping.`);
				done();
				return;
			}

			options.files = [options.files];
		}

		if (!options.mode || options.mode !== 'deleted') {
			options.files = grunt.file.expand(options.files);
		}

		for (let index = 0; index < options.files.length; index++) {
			let file = options.files[index];
			let key = generateKey(file);

			if (!!key.endsWith('.less')) {
				file = 'assets/theme.min.css';
			}

			try {
				if (options.mode === 'deleted') {
					await axios.delete(url + (!!file ? ('?asset[key]=' + key) : ''), shopifyAuth(options));
				} else {
					const r = await axios.put(url, shopifyRequest(key, file, fx, env), shopifyAuth(options));
				}
			} catch (error) {
				grunt.log.error(error);
				grunt.log.error(file + ': ' + JSON.stringify(error.response.data.errors));
				done();
				return;
			}

			grunt.log.ok(key + ': ' + (!!options.mode ? options.mode : 'uploaded'));
			await sleep(300);
		}

		if (options.files.length === 1) {
			await sleep(1000);
		}

		if (fx === 'deploy') {
			grunt.log.ok('Deployment of theme done');
		}

		done();
	});
};
