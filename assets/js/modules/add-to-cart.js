/**
* add-to-cart
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		btn: '.js-add-to-cart',
		qte: '.js-add-to-cart-qte'
	};

	var onVariantSelected = function (variant) {
		var btn = scope.find(sels.btn);
		btn.attr('data-id', variant.id);
		btn.prop('disabled', !variant.available);
		scope.find(sels.qte).val(1);
		btn.text(!!variant.available ? btn.attr('data-available-text') : btn.attr('data-out-of-stock-text')); // jshint ignore:line
	};

	var onClick = function (event) {
		var t = $(this);
		var id = t.attr('data-id');
		var qte = scope.find(sels.qte).val();

		event.preventDefault();
		event.stopPropagation();

		if (!id || !qte || !!t.prop('disabled')) {
			return;
		}

		t.addClass('is-loading');
		t.removeClass('is-error');

		$.ajax({
			method: 'POST',
			url: '/cart/add.js',
			dataType: 'json',
			data: {
				quantity: qte,
				id: id,
			},
			success: function (data) {
				App.notify('cart.itemAdded', data);
			},
			error: function () {
				t.addClass('is-error');
			},
			complete: function () {
				t.removeClass('is-loading');
			}
		});

		return false;
	};

	var init = function () {
		scope.on('click', sels.btn, onClick);
	};

	App.register(function () {
		return {
			app: {
				init: init
			},
			variant: {
				selected: onVariantSelected
			}
		};
	});

})(jQuery);
