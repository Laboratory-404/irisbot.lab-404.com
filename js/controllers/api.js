(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery', 'simplestorage'], factory);
	} else if (typeof module === 'object' && module.exports) {
		module.exports = function(root, jQuery) {
			if (jQuery === undefined) {
				if (typeof window !== 'undefined') {
					jQuery = require('jquery');
				} else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		factory(jQuery);
	}
} (function ($) {
	'use strict';

	var ajax_retry_timeout		= 1000;
	var ajax_retry_count		= 5;
	var ajax_timeout			= 15 * 1000;

	$.ajaxSetup({
		cache: true,
		timeout: ajax_timeout
	});

	function relay(url, data, type, headers) {
		console.log('relay(' + url + ')');

		if (typeof type === 'undefined') {
			type = 'POST';
		}

		if (typeof headers === 'undefined') {
			headers = {};
		}

		return $.ajax({
			type: type,
			url: url,
			headers: headers,
			data: data,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			beforeSend: function() {
				if (typeof Pace !== 'undefined') {
					if (typeof Pace.start === 'function') {
						Pace.start();
					}
				}
			},
			complete: function() {
				if (typeof Pace !== 'undefined') {
					if (typeof Pace.stop === 'function') {
						Pace.stop();
					}
				}
			}
		}).retry({
			times: ajax_retry_count,
			timeout: ajax_retry_timeout
		});
	}

	function relay_files(url, data, cb) {
		console.log('relay_files(' + url + ')');

		return $.ajax({
			type: 'POST',
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			url: url,
			data: data,
			xhrFields: {
				withCredentials: true
			},
			xhr: function() {
				var xhr = new window.XMLHttpRequest();

				xhr.upload.addEventListener('progress', function(e) {
					if (e.lengthComputable) {
						if (typeof cb === 'function') {
							cb(e.loaded / e.total);
						}
					}
				}, false);

				return xhr;
			},
			beforeSend: function() {
				if (typeof Pace !== 'undefined') {
					if (typeof Pace.start === 'function') {
						Pace.start();
					}
				}
			},
			complete: function() {
				if (typeof Pace !== 'undefined') {
					if (typeof Pace.stop === 'function') {
						Pace.stop();
					}
				}
			}
		});
	}

	// location = location.charAt(0).toUpperCase() + location.slice(1);

	/*request.get('http://api.openweathermap.org/data/2.5/find?q=' + location + '&type=like&units=metric&mode=json&APPID=dd3b7600991ac595232f54299ef6632c', function (err, res, body) {
		if (err) {
			// noinspection JSUnresolvedFunction
			debug.error(err);
			cb(null, 'I\'m not near a window right now, sorry.');
		} else if (typeof body !== 'undefined') {
			let results = JSON.parse(body);
			// noinspection JSUnresolvedFunction
			debug.verbose(results);

			if (typeof results !== 'undefined') {
				if (typeof results.list !== 'undefined') {
					if (results.list.length !== 0) {
						// noinspection JSUnresolvedFunction
						debug.verbose(JSON.stringify(results.list, null, 2));
						cb(null, location + ': ' + results.list[0]['weather'][0]['description']);
					} else {
						cb(null, 'I\'m not near a window right now, sorry.');
					}
				} else {
					cb(null, 'I\'m not near a window right now, sorry.');
				}
			} else {
				cb(null, 'I\'m not near a window right now, sorry.');
			}
		} else {
			cb(null, 'I\'m not near a window right now, sorry.');
		}
	});*/

	/*request.get('http://api.openweathermap.org/data/2.5/find?q=' + location + '&type=like&units=metric&mode=json&APPID=dd3b7600991ac595232f54299ef6632c', function (err, res, body) {
		if (err) {
			// noinspection JSUnresolvedFunction
			debug.error(err);
			cb(null, 'I don\'t have a thermometer with me, sorry.');
		} else if (typeof body !== 'undefined') {
			let results = JSON.parse(body);
			// noinspection JSUnresolvedFunction
			debug.verbose(results);

			if (typeof results !== 'undefined') {
				if (typeof results.list !== 'undefined') {
					if (results.list.length !== 0) {
						// noinspection JSUnresolvedFunction
						debug.verbose(JSON.stringify(results.list, null, 2));
						cb(null, 'In ' + location + ' it\'s about ' + results.list[0]['main'].temp + '°C');
					} else {
						cb(null, 'I don\'t have a thermometer with me, sorry.');
					}
				} else {
					cb(null, 'I don\'t have a thermometer with me, sorry.');
				}
			} else {
				cb(null, 'I don\'t have a thermometer with me, sorry.');
			}
		} else {
			cb(null, 'I don\'t have a thermometer with me, sorry.');
		}
	});*/

	// noinspection JSUnusedGlobalSymbols
	return {
		relay: relay,
		relay_files: relay_files
	}
}));