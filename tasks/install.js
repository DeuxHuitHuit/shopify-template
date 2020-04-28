module.exports = function install(grunt) {
	'use strict';

	const axios = require('axios');

	const sleep = async (time) => {
		return new Promise((resolve) => {
			setTimeout(resolve, time);
		});
	};

	const generateThemeConfig = (base, theme) => {
		return {
			api_key: base.api_key,
			password: base.password,
			myshopify: base.myshopify,
			theme_id: theme.id
		};
	};

	grunt.registerTask('install', 'Create themes in a Shopify store and generate the config', async () => {
		const done = grunt.task.current.async();
		const options = grunt.task.current.options();

		let currentConfig = grunt.file.readJSON('./config.json');
		let shopifyThemeConfig = grunt.file.readJSON('./config/settings_schema.json');

		const alreadyInstalled = Object.keys(currentConfig).length === options.env.length;

		if (!!alreadyInstalled) {
			grunt.log.error('Shopify themes already installed');
			done();
			return;
		}

		grunt.log.writeln('Configuration of the Shopify theme file with the package.json');
		shopifyThemeConfig[0].theme_name = grunt.config.data.pkg.title;
		grunt.file.write('./config/settings_schema.json', JSON.stringify(shopifyThemeConfig, null, '\t'), {
			encoding: 'utf8'
		});
		grunt.log.ok('Configuration of the Shopify theme done.');

		for (let index = 0; index < options.env.length; index++) {
			const env = options.env[index];

			if (!!currentConfig[env] && Object.keys(currentConfig).length > 1) {
				grunt.log.writeln(`Creation of the env ${env} skipped. Already exists`);
				break;
			}

			grunt.log.writeln(`Creation of the theme ${grunt.config.data.pkg.title} - ${env} on Shopify`);

			let response = await axios.post(`https://${currentConfig.default.myshopify}/admin/api/2020-04/themes.json`, {
				theme: {
					name: `${grunt.config.data.pkg.title} - ${env}`
				}
			}, {
				headers: {
					'Authorization': 'Basic ' + Buffer.from(currentConfig.default.api_key + ':' + currentConfig.default.password).toString('base64')
				}
			}).then(response => response.data).catch(error => error);

			await sleep(500);

			if (!response.theme) {
				grunt.log.error(response);
				break;
			}

			currentConfig[env] = generateThemeConfig(currentConfig.default, response.theme);

			grunt.log.ok(`Creation of the theme ${grunt.config.data.pkg.title} - ${env} done.`);
		}

		grunt.log.writeln('Configuration of the env in config.json');
		grunt.file.write('./config.json', JSON.stringify(currentConfig, null, '\t'), {
			encoding: 'utf8'
		});
		grunt.log.ok('Configuration of the env done.');

		grunt.config.set('shopify.options.auth', currentConfig);

		done();
	});
};
