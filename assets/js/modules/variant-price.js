/**
 * variants-price
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var scope = $('body');

	var sels = {
		ctn: '.js-variants-price-ctn',
		price: '.js-variants-price',
		priceCompare: '.js-variants-price-compare',
	};

	var onVariantSelected = function (variant) {
		scope.find(sels.price).text(variant.price.text);
		scope.find(sels.priceCompare).text(variant.compare_at_price.text || '');

		var hasSale = variant.price.value < variant.compare_at_price.value;
		scope.find(sels.ctn)[!!hasSale ? 'addClass' : 'removeClass']('has-sale');
	};

	App.register(function () {
		return {
			variant: {
				selected: onVariantSelected,
			},
		};
	});
})(jQuery);
