/**
* filters
* @author Deux Huit Huit
*/
(function ($, undefined) {

	'use strict';

	var scope = $('body');

	var sels = {
		filter: '.js-filter',
		ctn: '.js-filter-ctn',
		content: '.js-filter-content'
	};

	var onFilterChange = function () {
		var t = $(this);
		var ctn = t.closest(sels.ctn);
		var content = ctn.find(sels.content);
		var base = window.location.origin + window.location.pathname;
		var url = base + '?' + t.attr('data-key') + '=' + t.val();

		$.ajax({
			method: 'GET',
			url: url,
			success: function (data) {
				data = $(data);
				content.empty();
				content.append($(data.find(sels.content).html()));
				window.history.replaceState(null, '', url);
			}
		});
	};

	var init = function () {
		scope.on('change', sels.filter, onFilterChange);
	};

	App.register(function () {
		return {
			app: {
				init: init
			}
		};
	});

})(jQuery);
