/**
* locales
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('html');

	var sels = {
		data: '.js-locales',
		ctn: '.js-locale',
		select: '.js-locale-select',
		alts: 'link[rel="alternate"]'
	};

	var currentLocale = window.Shopify.locale;
	var locales = JSON.parse(scope.find(sels.data).html() || '[]');
	var altLocale = [];

	$.each(locales, function (index, element) {
		if (element.iso !== currentLocale) {
			altLocale.push(element);
		}
	});

	var onLocaleSelect = function () {
		var t = $(this);
		if (window.location.href !== t.val()) {
			window.location.href = t.val();
		}
	};

	var renderNav = function () {
		var html = $();
		
		if (!!altLocale.length) {
			if (altLocale.length > 1) {
				html = $('<select />').addClass(sels.select.substring(1));

				$.each(locales, function (index, locale) {
					var selected = currentLocale === locale.iso;
					var alt = scope.find(sels.alts).filter('[hreflang=' + locale.iso + ']');
					var o = $('<option />').attr('value', alt.attr('href')).prop('selected', selected); // jshint ignore:line
					html.append(o.text(locale.iso));
				});
			} else {
				var alt = scope.find(sels.alts).filter('[hreflang=' + altLocale[0].iso + ']');
				html = $('<a />').text(altLocale[0].iso).attr('href', alt.attr('href'));
			}
		}

		scope.find(sels.ctn).append(html);
	};

	var init = function () {
		renderNav();
		scope.on('change', sels.select, onLocaleSelect);
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
