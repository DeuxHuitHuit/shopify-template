/**
* cart-update
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		total: '.js-cart-total',
		item: '.js-cart-item',
		itemTotal: '.js-cart-item-total',
		discount: '.js-cart-discounts',
		discountCtn: '.js-cart-discounts-ctn',
		qte: '.js-cart-qte'
	};

	var formatMoney = function (money) {
		var currency = window.Shopify.currency.active;
		money = (money / 100).toFixed(2);

		if (currency == 'EUR') {
			money = '€' + money.replace('.', ',');
		} else {
			money = '$' + money;
		}

		return money;
	};

	var onCartUpdate = function (cart) {
		if (!cart.items.length && window.location.pathname === '/cart' && !!scope.find(sels.item).length) { // jshint ignore:line
			window.location.reload();
			return;
		}

		$.each(cart.items, function (index, item) {
			var items = scope.find(sels.item).filter('[data-id="' + item.id + '"]');

			// new item added, reloading
			if (!items.length && window.location.pathname === '/cart') {
				window.location.reload();
				return;
			}

			items.each(function () {
				var t = $(this);
				var total = t.find(sels.itemTotal);
				var qte = t.find(sels.qte);

				qte.val(item.quantity);
				total.text(formatMoney(item.final_line_price));
			});
		});

		scope.find(sels.item).each(function () {
			var t = $(this);
			var id = t.attr('data-id');
			var remove = true;

			$.each(cart.items, function (index, item) {
				if (item.id + '' === id) {
					remove = false;
					return false;
				}
			});

			if (!!remove) {
				t.remove();
			}
		});

		scope.find(sels.total).text(formatMoney(cart.total_price));
		scope.find(sels.discount).text(formatMoney(cart.total_discount));
		scope.find(sels.discountCtn)[!!cart.total_discount ? 'show' : 'hide']();
	};

	App.register(function () {
		return {
			cart: {
				update: onCartUpdate
			}
		};
	});

})(jQuery);
