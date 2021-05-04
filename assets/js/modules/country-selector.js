/**
 * country-selector
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var scope = $('body');

	var sels = {
		ctn: '.js-country-selector-ctn',
		country: '.js-country-selector',
		province: '.js-country-selector-province',
	};

	var onChange = function () {
		var t = $(this);
		var ctn = t.closest(sels.ctn);
		var province = ctn.find(sels.province);
		var options = JSON.parse(t.find(':selected').attr('data-provinces') || '[]');

		province.empty().val();

		$.each(options, function (index, option) {
			province.append($('<option />').text(option[1]).attr('value', option[0]));
		});

		province.prop('disabled', !options.length);
	};

	var sync = function () {
		scope.find(sels.ctn).each(function () {
			var t = $(this);
			var country = t.find(sels.country);
			var province = t.find(sels.province);

			country.val(country.attr('data-country')).trigger('change');
			province.val(province.attr('data-province'));
		});
	};

	var init = function () {
		scope.on('change', sels.country, onChange);
		sync();
	};

	App.register(function () {
		return {
			app: {
				init: init,
			},
		};
	});
})(jQuery);
