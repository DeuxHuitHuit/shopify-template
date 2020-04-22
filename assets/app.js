/**
 * @author Deux Huit Huit
 */
(function ($) {

	'use strict';

	var modules = [];

	var resolveFx = function (key, mod) {
		var actions = mod();
		var match = null;

		if (!!actions) {
			match = actions;

			if (!!match && typeof match === 'function') {
				return match;
			}

			var path = key.split('.');

			path.forEach(function (p) {
				if (!match || typeof match !== 'object') {
					return false;
				}

				match = match[p];
			});

			if (typeof match !== 'function') {
				match = null;
			}
		}

		return match;
	};

	window.App = {
		register: function (mod) {
			modules.push(mod);
		},
		notify: function (key, data) {
			$.each(modules, function (index, mod) {
				var fx = resolveFx(key, mod);

				if (!!fx) {
					fx(data);
				}
			});
		}
	};

	var init = function () {
		App.notify('app.init');
	};

	$(init);

})(jQuery);
