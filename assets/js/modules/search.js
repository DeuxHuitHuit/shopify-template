/**
 * search
 * @author Deux Huit Huit
 */
(function ($, undefined) {
	'use strict';

	var scope = $('body');

	var sels = {
		ctn: '.js-search',
		input: '.js-search-input',
		resultCtn: '.js-search-result',
		results: '.js-results',
		resultTemplate: '.js-results-template',
		noResultTemplate: '.js-no-results-template',
		searchClear: '.js-search-clear',
	};

	var search = function (ctn, query, page) {
		if (!query) {
			return;
		}

		if (!page) {
			page = 1;
		}

		var url = '/search/suggest.json?q=' + encodeURI(query);
		url += '&page=' + page + '&resources[type]=';

		ctn.attr('data-search', 'search');

		ctn.find(sels.resultCtn).each(function () {
			var t = $(this);
			var facet = t.attr('data-facet');
			url += facet;

			if (!t.is(ctn.find(sels.resultCtn).last())) {
				url += ',';
			}
		});

		$.ajax({
			method: 'GET',
			url: url,
			success: function (data) {
				var results = data.resources.results;

				ctn.find(sels.resultCtn).each(function () {
					var t = $(this);
					var facet = t.attr('data-facet');
					var resultsCtn = t.find(sels.results);
					var limit = t.attr('data-facet-limit');

					var template = t.find(sels.resultTemplate).html();
					var templateMatch = template.match(/__([a-zA-Z\-]{1,})__/gm);

					resultsCtn.empty();

					if (!!results[facet + 's'].length) {
						$.each(
							results[facet + 's'].slice(0, parseInt(limit, 10)),
							function (i, result) {
								// jshint ignore:line
								var r = template;

								$.each(templateMatch, function (index, match) {
									var search = new RegExp(match, 'gm');
									var key = match.match(/[a-zA-Z\-]{1,}/);
									var value = result[key];

									if (key === 'image') {
										value = result.featured_image.url;
									} else if (key === 'alt') {
										value = result.featured_image.alt;
									}

									r = r.replace(search, value);
								});

								resultsCtn.append(r);
							},
						);
					} else {
						resultsCtn.append(t.find(sels.noResultTemplate).html());
					}
				});
			},
		});
	};

	var clearSearch = function (ctn) {
		ctn.attr('data-search', 'idle');
		ctn.find(sels.resultCtn).each(function () {
			var t = $(this);
			var resultsCtn = t.find(sels.results);
			resultsCtn.empty();
		});
	};

	var onInputChange = function () {
		var t = $(this);
		var ctn = t.closest(sels.ctn);
		var val = t.val();
		if (!!val) {
			search(ctn, val);
		} else {
			clearSearch(ctn);
		}
	};

	var onReset = function () {
		var t = $(this);
		var ctn = t.closest(sels.ctn);
		scope.find(sels.input).val('');
		clearSearch(ctn);
	};

	var init = function () {
		scope.on('keyup', sels.input, onInputChange);
		scope.on('click', sels.searchClear, onReset);
	};

	App.register(function () {
		return {
			app: {
				init: init,
			},
		};
	});
})(jQuery);
