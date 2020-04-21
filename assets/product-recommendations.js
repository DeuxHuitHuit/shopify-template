/**
* product-recommendations
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		ctn: '.js-product-recommendations',
		template: '.js-product-recommendations-template'
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

	var fetchRecommendation = function () {
		var t = $(this);

		if (!t.html() || !t.attr('data-product-id')) {
			return;
		}

		var template = scope.find(sels.template).html();
		var templateMatch = template.match(/__([a-zA-Z\-]{1,})__/gm);

		$.ajax({
			method: 'GET',
			url: '/recommendations/products.json?limit=' + t.attr('data-limit') + '&product_id=' + t.attr('data-product-id'),
			success: function (data) {
				$.each(data.products, function (index, product) {
					var productRecommendation = template;

					$.each(templateMatch, function (index, match) {
						var search = new RegExp(match, 'gm');
						var key = match.match(/[a-zA-Z\-]{1,}/)[0];

						key = key.replace(/\-/g, '_');

						var value = product[key] + '';


						if (key === 'image') {
							value = product.featured_image;
						} else if (key === 'alt') {
							value = product.title;
						} else if (key === 'compare_at_price') {
							value = formatMoney(product.compare_at_price);
						} else if (key === 'price_min') {
							value = formatMoney(product.price_min);
						}


						productRecommendation = productRecommendation.replace(search, value);
					});

					t.append(productRecommendation);
				});
			}
		});
	};

	var init = function () {
		scope.find(sels.ctn).each(fetchRecommendation);
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
