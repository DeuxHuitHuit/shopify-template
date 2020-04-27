/**
* gift-card
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		code: '.js-gift-card-code'
	};

	var onCodeClick = function () {
		var t = this;
		t.select();
		t.setSelectionRange(0, 99999);
		window.document.execCommand('copy');
	};

	var init = function () {
		scope.on('click', sels.code, onCodeClick);
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
