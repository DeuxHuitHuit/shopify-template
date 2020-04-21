/**
* cart-count
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		item: '.js-cart-count'
	};

	var onCartUpdate = function (cart) {
		scope.find(sels.item).text(cart.items.length);
	};

	App.register(function () {
		return {
			cart: {
				update: onCartUpdate
			}
		};
	});

})(jQuery);
