/**
* currency-selector
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		select: '.js-currency-selector'
	};

	var onChange = function () {
		var t = $(this);
		var currency = t.val();

		if (window.Shopify.currency.active !== currency) {
			var base = window.location.origin + window.location.pathname;
			window.location.href = base + '?currency=' + currency;
		}
	};

	var init = function () {
		scope.find(sels.select).val(window.Shopify.currency.active);
		scope.on('change', sels.select, onChange);
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
