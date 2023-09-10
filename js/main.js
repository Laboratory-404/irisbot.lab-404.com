;//noinspection ThisExpressionReferencesGlobalObjectJS
(function(global) {
	'use strict';

	var $html					= null;
	var $body					= null;
	var $window					= null;
	var $document				= null;
	var $wrapper				= null;
	var $content				= null;
	var $input					= null;
	var $form					= null;
	var $send					= null;
	var $listen					= null;
	var $clock					= null;
	var $device					= null;
	var $intro					= null;
	var $start					= null;

	var clock_interval			= null;

	var rs						= null;
	var rsfiles					= [
		'content/ro-RO/variables.txt',
		'content/ro-RO/substitutions.txt',
		'content/ro-RO/colors.txt',
		'content/ro-RO/profanity.txt',
		'content/ro-RO/greetings.txt',
		'content/ro-RO/yesnomaybe.txt',
		'content/ro-RO/global.txt',
		'content/ro-RO/personality.txt',
		'content/ro-RO/horoscope.txt',
		'content/ro-RO/topics.txt',
		'content/ro-RO/functions.txt',
		'content/ro-RO/weather.txt',
		'content/ro-RO/default.txt'
	];

	var sr						= null;
	var sgl						= null;
	var sre						= null;
	var recognition				= null;
	var hotword					= null;
	var hotword_spoken			= false;

	//noinspection JSUnusedLocalSymbols,JSFileReferences
	require.config({
		paths: {
			ajaxretry: 'libraries/jquery-ajax-retry-0.2.8.min',
			api: 'controllers/api',
			awssdk: 'libraries/aws-sdk-2.462.0.min',
			bootstrap: 'libraries/bootstrap-4.3.1.min',
			builder: 'controllers/builder',
			chart: 'libraries/chart-2.8.0.min',
			coreui: 'libraries/coreui-2.1.9.min',
			'datatables.net': 'libraries/datatables-1.10.19.min',
			'datatables.net-bs4': 'libraries/datatables-bootstrap4-1.10.19.min',
			'datatables.net-editor': 'libraries/datatables-editor-1.6.7.min',
			'datatables.net-buttons': 'libraries/datatables-buttons-1.5.6.min',
			'datatables.net-buttons-colvis': 'libraries/datatables-buttons-colvis-1.5.6.min',
			'datatables.net-buttons-html5': 'libraries/datatables-buttons-html5-1.5.6.min',
			'datatables.net-buttons-print': 'libraries/datatables-buttons-print-1.5.6.min',
			'datatables.net-buttons-bs4': 'libraries/datatables-buttons-bootstrap4-1.5.6.min',
			'datatables.net-colreorder': 'libraries/datatables-colreorder-1.5.1.min',
			'datatables.net-colreorder-bs4': 'libraries/datatables-colreorder-bootstrap4-1.5.1.min',
			'datatables.net-fixedcolumns': 'libraries/datatables-fixedcolumns-3.2.6.min',
			'datatables.net-fixedcolumns-bs4': 'libraries/datatables-fixedcolumns-bootstrap4-3.2.6.min',
			'datatables.net-fixedheader': 'libraries/datatables-fixedheader-3.1.5.min',
			'datatables.net-fixedheader-bs4': 'libraries/datatables-fixedheader-bootstrap4-3.1.5.min',
			'datatables.net-responsive': 'libraries/datatables-responsive-2.2.3.min',
			'datatables.net-responsive-bs4': 'libraries/datatables-responsive-bootstrap4-2.2.3.min',
			'datatables.net-select': 'libraries/datatables-select-1.3.0.min',
			'datatables.net-select-bs4': 'libraries/datatables-select-bootstrap4-1.3.0.min',
			html2canvas: 'libraries/html2canvas-1.0.0-rc.1.min',
			i18next: 'libraries/i18next-15.1.2.min',
			jquery: 'libraries/jquery-3.4.1.min',
			jqueryhotkeys: 'libraries/jquery-hotkeys-0.1.0',
			jqueryform: 'libraries/jquery-form-4.2.2.min',
			jqueryi18next: 'libraries/jquery-i18next-1.2.1.min',
			json: 'libraries/requirejs-json-1.0.3',
			jszip: 'libraries/jszip-3.2.1.min',
			'lightgallery': 'libraries/lightgallery-1.6.12.min',
			'lightgallery-autoplay': 'libraries/lightgallery-autoplay-1.6.12.min',
			'lightgallery-fullscreen': 'libraries/lightgallery-fullscreen-1.6.12.min',
			'lightgallery-hash': 'libraries/lightgallery-hash-1.6.12.min',
			'lightgallery-pager': 'libraries/lightgallery-pager-1.6.12.min',
			'lightgallery-share': 'libraries/lightgallery-share-1.6.12.min',
			'lightgallery-thumbnail': 'libraries/lightgallery-thumbnail-1.6.12.min',
			'lightgallery-video': 'libraries/lightgallery-video-1.6.12.min',
			'lightgallery-zoom': 'libraries/lightgallery-zoom-1.6.12.min',
			moment: 'libraries/moment-2.24.0.min',
			'moment-timezone': 'libraries/moment-timezone-0.5.25.min',
			noext: 'libraries/requirejs-noext-1.0.3',
			pace: 'libraries/pace-1.0.2.min',
			pdfmake: 'libraries/pdfmake-0.1.56.min',
			'pdfmake-fonts': 'libraries/pdfmake-fonts-0.1.56',
			'perfect-scrollbar': 'libraries/perfect-scrollbar-1.4.0.min',
			popper: 'libraries/popper-1.15.0.min',
			promise: 'polyfills/es6-promise-4.2.5.min',
			router: 'controllers/router',
			rivescript: 'libraries/rivescript-2.0.0.min',
			select2: 'libraries/select2-4.0.7.min',
			simplestorage: 'libraries/simplestorage-0.2.1.min',
			summernote: 'libraries/summernote-bs4-0.8.12.min',
			tempusdominus: 'libraries/tempusdominus-bootstrap-4-5.1.2.min',
			text: 'libraries/requirejs-text-2.0.15',
			toastr: 'libraries/toastr-2.1.4.min',
			vs: 'libraries/monaco-editor-0.16.2'
		},
		map: {
			'*': {
				jQuery: 'jquery',
				monacoeditor: 'vs/editor/editor.main'
			}
		},
		shim: {
			awssdk: {
				exports: 'AWS'
			},
			bootstrap: {
				deps: ['jquery', 'popper']
			},
			chart: {
				exports: 'Chart'
			},
			coreui: {
				deps: ['bootstrap', 'perfect-scrollbar', 'chart', 'summernote', 'toastr', 'lightgallery-autoplay', 'lightgallery-thumbnail', 'lightgallery-zoom']
			},
			'datatables.net-bs4': {
				deps: ['datatables.net-editor']
			},
			'datatables.net-buttons-bs4': {
				deps: ['datatables.net-buttons-colvis', 'datatables.net-buttons-html5', 'datatables.net-buttons-print']
			},
			'datatables.net-buttons-html5': {
				deps: ['pdfmake-fonts']
			},
			i18next: {
				deps: ['promise']
			},
			jqueryhotkeys: {
				deps: ['jquery']
			},
			jszip: {
				exports: 'JSZip'
			},
			'lightgallery-autoplay': {
				deps: ['lightgallery']
			},
			'lightgallery-fullscreen': {
				deps: ['lightgallery']
			},
			'lightgallery-pager': {
				deps: ['lightgallery']
			},
			'lightgallery-hash': {
				deps: ['lightgallery']
			},
			'lightgallery-share': {
				deps: ['lightgallery']
			},
			'lightgallery-thumbnail': {
				deps: ['lightgallery']
			},
			'lightgallery-video': {
				deps: ['lightgallery']
			},
			'lightgallery-zoom': {
				deps: ['lightgallery']
			},
			'pdfmake-fonts': {
				exports: 'pdfMake',
				deps: ['jszip', 'pdfmake', 'moment-timezone'],
				init: function(JSZip, pdfMake, moment) {
					window.JSZip = JSZip;
					window.moment = moment;
				}
			},
			'moment-timezone': {
				exports: 'moment',
				deps: ['moment']
			},
			promise: {
				exports: 'Promise'
			},
			rivescript: {
				exports: 'RiveScript'
			}
		},
		urlArgs: 'rand=' + (new Date()).getTime(),
		waitSeconds : 300
	});

	require([
		'jquery',
		'simplestorage',
		'api',
		'rivescript',
		'perfect-scrollbar',
		'awssdk',
		'ajaxretry'
	], function ($, SimpleStorage, API, RiveScript, PerfectScrollbar, AWS) {
		$(function() {
			$html		= $('html');
			$body		= $('body');
			$window		= $(global);
			$document	= $(global.document);
			$wrapper 	= $('.content-wrapper').first();
			$content	= $('.content').first();
			$input		= $('.input input').first();
			$send		= $('.input .action .send').first();
			$listen		= $('.input .action .listen').first();
			$form		= $('form').first();
			$clock		= $('.clock').first();
			$intro		= $('.intro').first();
			$start		= $('.start').first();
			$device		= $('.device-content, .device-frame');

			function random(min, max) {
				return Math.floor(Math.random() * (max - min) ) + min;
			}

			if (clock_interval === null) {
				var clock_update = function() {
					var today = new Date();

					var h = today.getHours();
					var m = today.getMinutes();

					if (h >= 12) {
						h = h - 12;
					}

					if (h === 0) {
						h = 12;
					}

					m = m < 10 ? '0' + m : m;

					console.log(h + ':' + m);
					$clock.text(h + ':' + m);
				};

				clock_update();
				clock_interval = setInterval(clock_update, 30000);
			}

			$start.off('click').on('click', function(e) {
				e.preventDefault();

				$intro.hide();
				$device.show();

				if (typeof AWS !== 'undefined') {
					// noinspection JSUnresolvedVariable
					if (typeof AWS.config !== 'undefined') {
						// noinspection JSUnresolvedVariable
						if (typeof AWS.config.region !== 'undefined') {
							// noinspection JSUnresolvedVariable
							AWS.config.region = 'eu-west-1';
						}

						// noinspection JSUnresolvedVariable
						if (typeof AWS.config.credentials !== 'undefined' && typeof AWS.CognitoIdentityCredentials !== 'undefined') {
							// noinspection JSUnresolvedVariable,JSUnresolvedFunction
							AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: 'eu-west-1:043f5065-80b0-4f63-b7e8-1de06e8ac429'});
						}
					}
				}

				if (typeof PerfectScrollbar !== 'undefined') {
					var perfect_scrollbar = new PerfectScrollbar('.content-wrapper', {
						suppressScrollX: true
					});

					setTimeout(function() {
						if (perfect_scrollbar) {
							// noinspection JSUnresolvedVariable
							if (typeof perfect_scrollbar.update === 'function') {
								// noinspection JSUnresolvedFunction
								perfect_scrollbar.update();
							}
						}
					}, 10);
				}

				if (typeof RiveScript !== 'undefined') {
					rs = new RiveScript({
						debug: true,
						onDebug: function(msg) {
							global.console.log('[IRIS] ' + msg);
						}
					});

					rs.loadFile(rsfiles).then(function() {
						$content.html('<p class="bubble bot">Salutare! Ce faci?</p><br />');
						$input.removeAttr('disabled').focus().off('keyup').on('keyup', function() {
							var $el = $(this);

							if ($el.val() !== '') {
								$send.show().addClass('enabled');
								$listen.hide();
							} else {
								$send.removeClass('enabled');

								if (global.SYSTEM_FEATURE_WEBSPEECH_RECOGNITION === true) {
									$send.hide();
									$listen.show();
								} else {
									$send.show();
									$listen.hide();
								}
							}
						});

						if (global.SYSTEM_FEATURE_WEBSPEECH_RECOGNITION === true) {
							// noinspection JSUnresolvedVariable
							sr = typeof SpeechRecognition !== 'undefined' ? SpeechRecognition : webkitSpeechRecognition;
							// noinspection JSUnresolvedVariable
							sgl = typeof SpeechGrammarList !== 'undefined' ? SpeechGrammarList : webkitSpeechGrammarList;
							// noinspection JSUnresolvedVariable
							sre = typeof SpeechRecognitionEvent !== 'undefined' ? SpeechRecognitionEvent : webkitSpeechRecognitionEvent;

							hotword = new sr();
							hotword.lang = 'ro-RO';
							hotword.continuous = true;
							hotword.interimResults = false;
							hotword.maxAlternatives = 5;

							hotword.onstart = function() {
								global.console.log('Hotword Recognition: START');
							};

							hotword.onresult = function(e) {
								var last = e.results.length - 1;
								var result = e.results[last][0].transcript;

								global.console.log('Hotword Result received: ' + result);
								global.console.log('Hotword Confidence: ' + e.results[0][0].confidence);

								if (result.toLowerCase().indexOf('iris') !== -1) {
									hotword_spoken = true;
									global.console.log('Hotword Recognition: STOP');
									hotword.stop();
									recognition.start();
									$listen.addClass('enabled');
								}
							};

							hotword.onnomatch = function(e) {
								global.console.log('Hotword Recognition: ' + e);
							};

							hotword.onerror = function(e) {
								global.console.log('Hotword Recognition Error: ' + e.error);
								global.console.log('Hotword Recognition: STOP');
							};

							hotword.onend = function() {
								if (hotword_spoken === false) {
									hotword.start();
								} else {
									hotword_spoken = false;
								}
							};

							recognition = new sr();
							recognition.lang = 'ro-RO';
							recognition.interimResults = false;
							recognition.maxAlternatives = 5;

							recognition.onstart = function() {
								global.console.log('Voice Recognition: START');
							};

							recognition.onresult = function(e) {
								var last = e.results.length - 1;
								var result = e.results[last][0].transcript;

								global.console.log('Voice Result received: ' + result);
								global.console.log('Voice Confidence: ' + e.results[0][0].confidence);

								if (result !== '') {
									$input.val(result);
									$form.trigger('submit');
								}
							};

							recognition.onspeechend = function() {
								global.console.log('Voice Recognition: STOP');
								recognition.stop();
								$listen.removeClass('enabled');

								if (global.isMobile === false) {
									hotword.start();
								}
							};

							recognition.onnomatch = function(e) {
								global.console.log('Voice Recognition: ' + e);
							};

							recognition.onerror = function(e) {
								global.console.log('Voice Recognition Error: ' + e.error);
								global.console.log('Voice Recognition: STOP');
								$listen.removeClass('enabled');
							};

							$send.hide();

							$listen.show().off('click').on('click', function() {
								hotword_spoken = true;
								global.console.log('Hotword Recognition: STOP');
								hotword.stop();
								recognition.start();
								$listen.addClass('enabled');
							});

							if (global.isMobile === false) {
								hotword.start();
							}
						} else {
							$send.show();
							$listen.hide();
						}

						$form.off('submit').on('submit', function(e) {
							e.preventDefault();

							var original_text = $input.val();

							if (original_text !== '') {
								var text = original_text;
								text = text.replace(/[ăâ]/g, 'a');
								text = text.replace(/[î]/g, 'i');
								text = text.replace(/[ș]/g, 's');
								text = text.replace(/[ț]/g, 't');
								text = text.replace(/(?:^|\s)unu(?=\s|$)/g, ' 1');
								text = text.replace(/(?:^|\s)doi(?=\s|$)/g, ' 2');
								text = text.replace(/(?:^|\s)trei(?=\s|$)/g, ' 3');
								text = text.replace(/(?:^|\s)patru(?=\s|$)/g, ' 4');
								text = text.replace(/(?:^|\s)cinci(?=\s|$)/g, ' 5');
								text = text.replace(/(?:^|\s)sase(?=\s|$)/g, ' 6');
								text = text.replace(/(?:^|\s)sapte(?=\s|$)/g, ' 7');
								text = text.replace(/(?:^|\s)opt(?=\s|$)/g, ' 8');
								text = text.replace(/(?:^|\s)noua(?=\s|$)/g, ' 9');
								text = text.replace(/(?:^|\s)zece(?=\s|$)/g, ' 10');
								text = $.trim(text);

								global.console.log(text);
								$input.val('');

								$content.append('<p class="bubble user">' + original_text + '</p><br />');
								$wrapper.animate({scrollTop: $wrapper.get(0).scrollHeight - $wrapper.height() }, 'slow');

								rs.reply('user', text, this).then(function(reply) {
									reply = reply.replace(/\n/g, '<br />');
									global.console.log(reply);

									$content.append('<p class="bubble bot loading"><span><span class="loading-animation loading-delay-1"></span><span class="loading-animation loading-delay-2"></span><span class="loading-animation loading-delay-3"></span></span></p><br />');
									$wrapper.animate({scrollTop: $wrapper.get(0).scrollHeight - $wrapper.height() }, 'slow');

									if (typeof AWS !== 'undefined') {
										// noinspection JSUnresolvedVariable
										if (typeof AWS.Polly !== 'undefined') {
											var speechParams = {
												OutputFormat: 'mp3',
												SampleRate: '16000',
												Text: $('<div/>').html(reply).text(),
												TextType: 'text',
												VoiceId: 'Carmen'
											};

											// noinspection JSUnresolvedFunction
											var polly = new AWS.Polly({apiVersion: '2016-06-10'});
											// noinspection JSUnresolvedVariable
											var signer = new AWS.Polly.Presigner(speechParams, polly);

											signer.getSynthesizeSpeechUrl(speechParams, function (err, url) {
												if (err) {
													global.console.log('Speech Synthesis Error: ' + err);
												} else {
													$('#audioSource').attr('src', url);

													var playback = $('#audioPlayback').get(0);
													playback.load();

													setTimeout(function() {
														$content.find('.bubble.bot.loading').last().removeClass('loading').html(reply);
														$wrapper.animate({scrollTop: $wrapper.get(0).scrollHeight - $wrapper.height() }, 'slow');
														playback.play();
													}, random(100, 1000));
												}
											});
										}
									}
								}).catch(function(err) {
									$content.append('<p class="bubble bot">' + err + '</p><br />');
									global.console.log(err);
								});
							}
						});

						rs.sortReplies();
					}).catch(function (err) {
						$content.append('<p class="bubble bot">' + err + '</p><br />');
						global.console.log(err);
					});

					// noinspection JSUnusedLocalSymbols
					rs.setSubroutine('weather', function(rs, args) {
						// var location = 'Bucharest';
					});
				} else {
					$content.append('<p class="bubble bot">Eroare la inițializare!</p><br />');
					global.console.log('Error initialiazing!');
				}
			});

			$window.off('resize').on('resize', function() {
				global.console.log('resize()');

				var $wrapper = $('.wrapper');
				var $el = $('.device-wrapper');

				var wrapper_width = $wrapper.width();
				var wrapper_height = $wrapper.height();
				var el_outer_height = $el.outerHeight();
				var el_outer_width = $el.outerWidth();

				$el.css({transform: 'translate(-50%, -50%) ' + 'scale(' + Math.min(wrapper_width / el_outer_width, wrapper_height / el_outer_height) + ')'});
			});
			$window.trigger('resize');
		});
	});

	global.onerror = function(err, url, line) {
		global.alert('Error: ' + err + ' in ' + url + ' at line ' + line);
		global.console.log('Error: ' + err + ' in ' + url + ' at line ' + line);
	};
})(window);