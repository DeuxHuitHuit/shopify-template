/**
* variants
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('html');

	var sels = {
		data: '.js-variants-data',
		selectors: '.js-variant-selector',
		canonical: 'link[rel="canonical"]'
	};

	var variants = JSON.parse(scope.find(sels.data).html() || '[]');

	var selectVariant = function () {

		if (!variants.length) {
			return;
		}

		var option1 = scope.find(sels.selectors).eq(0).val() || null;
		var option2 = scope.find(sels.selectors).eq(1).val() || null;
		var option3 = scope.find(sels.selectors).eq(2).val() || null;

		var variant = null;

		$.each(variants, function (index, vari) {
			if (vari.option1 === option1 && vari.option2 === option2 && vari.option3 === option3) {
				variant = vari;
				return false;
			}
		});

		if (!variant) {
			variant = variants[0];
		}

		window.history.replaceState({ variant: variant }, '', variant.url);
		scope.find(sels.canonical).attr('href', 'https://' + window.Shopify.shop + variant.url);

		App.notify('variant.selected', variant);
	};

	var init = function () {
		scope.on('change', sels.selectors, selectVariant);
		selectVariant();
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
