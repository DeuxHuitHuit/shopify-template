/**
 * Watermark
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var sels = {
		ctn: '.js-watermark-ctn'
	};

	var init = function () {
		$(sels.ctn).each(function () {
			var t = $(this);
			if (!!t.attr('data-href') && !t.html()) {
				$.ajax({
					method: 'GET',
					crossDomain: true,
					url: t.attr('data-href'),
					success: function (data) {
						t.append($(data).find('watermark').html());
					}
				});
			}
		});
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});
})(jQuery);
