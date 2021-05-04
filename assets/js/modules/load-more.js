/**
 * load-more
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var scope = $('body');

	var sels = {
		ctn: '.js-load-more-ctn',
		btn: '.js-load-more-btn',
		content: '.js-load-more-content',
	};

	var onLoadMoreClick = function () {
		var t = $(this);
		var ctn = t.closest(sels.ctn);
		var content = ctn.find(sels.content);
		var url = t.attr('data-url');

		t.prop('disabled', true);

		$.ajax({
			method: 'GET',
			url: url,
			success: function (data) {
				data = $(data);

				content.append(data.find(sels.content).html());
				App.notify('masonry.refresh');

				if (data.find(sels.btn).length) {
					t.attr('data-url', data.find(sels.btn).attr('data-url'));
					t.prop('disabled', false);
				} else {
					t.remove();
				}
			},
		});
	};

	var init = function () {
		scope.on('click', sels.btn, onLoadMoreClick);
	};

	App.register(function () {
		return {
			app: {
				init: init,
			},
		};
	});
})(jQuery);
