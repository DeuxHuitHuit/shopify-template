/**
 * cart-update-qte
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var scope = $('body');

	var sels = {
		qte: '.js-cart-qte',
		btn: '.js-cart-qte-btn',
	};

	var REQUEST_DELAY = 200;
	var timer = null;

	var changeQte = function (id, qte) {
		$.ajax({
			method: 'POST',
			url: '/cart/change.js',
			dataType: 'json',
			data: {
				id: id,
				quantity: qte,
			},
			success: function (cart) {
				App.notify('cart.forceUpdate', cart);
			},
		});
	};

	var onQteChange = function () {
		var t = $(this);
		var id = t.attr('data-id');
		var qte = t.val();

		clearTimeout(timer);

		timer = setTimeout(function () {
			changeQte(id, qte);
		}, REQUEST_DELAY);
	};

	var onQteBtnClick = function (event) {
		var t = $(this);
		var id = t.attr('data-id');
		var qte = t.attr('data-qte');
		changeQte(id, qte);

		event.preventDefault();
		event.stopPropagation();
		return false;
	};

	var init = function () {
		scope.on('change', sels.qte, onQteChange);
		scope.on('click', sels.btn, onQteBtnClick);
	};

	App.register(function () {
		return {
			app: {
				init: init,
			},
		};
	});
})(jQuery);
