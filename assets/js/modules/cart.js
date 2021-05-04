/**
 * cart
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var fetchCart = function () {
		$.ajax({
			method: 'GET',
			url: '/cart.js',
			dataType: 'json',
			success: function (cart) {
				App.notify('cart.update', cart);
			},
		});
	};

	var onItemAdded = function () {
		fetchCart();
	};

	var onForceUpdate = function (cart) {
		App.notify('cart.update', cart);
	};

	var init = function () {
		fetchCart();
	};

	App.register(function () {
		return {
			app: {
				init: init,
			},
			cart: {
				itemAdded: onItemAdded,
				forceUpdate: onForceUpdate,
			},
		};
	});
})(jQuery);
