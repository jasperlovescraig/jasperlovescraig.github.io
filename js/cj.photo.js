/**
 * @file Scripts specific to photo api
 * Created:  07/09/2013
 * Modified: 07/09/2013
 */

/**
 * CJ
 * @namespace
 * @type {object}
 * @global
 * @public
 */
var CJ = CJ || {};

/**
 * Immediately-Invoked Function Expression.
 *
 * @function
 * @param {object} $ - Global jQuery object.
 */
(function ($) {

	// strict js
	'use strict';

	/**
	 * Creates an instance of JcycleConstructor.
	 * Modified: 07/09/2013
	 *
	 * @constructor
	 * @author Craig Lucas <clucas@everydayhealthinc.com>
	 */
	CJ.PhotoConstructor = function () {};

	/**
	 * Inheritable methods.
	 *
	 * @type {object}
	 */
	CJ.PhotoConstructor.prototype = {

		/**
		 * Initialization methods.
		 * Modified: 07/09/2013
		 *
		 * @method init
		 * @author Craig Lucas <clucas@everydayhealthinc.com>
		 * @public
		 */
		init : function () {
			this.objectInit();
			this.bindEvents();
		},

		/**
		 * Initialize objects
		 * Modified: 07/09/2013
		 *
		 * @method objectInit
		 * @author Craig Lucas <clucas@everydayhealthinc.com>
		 * @public
		 */
		objectInit : function () {
			this.Photoset.load();
		},

		/**
		 * bind events
		 * Modified: 07/09/2013
		 *
		 * @method bindEvents
		 * @author Craig Lucas <clucas@everydayhealthinc.com>
		 * @public
		 */
		bindEvents : function () {
			var $photoDiv = $('#weddingPhotos'),
			setID,
			img,
			path,
			_self = this;

			$photoDiv.find('#gallery .thumbnail').on("click.launchFullScreen", function (e) {
				//e.preventDefault();
				img = $(this).find('src');
				path = img.attr('src').replace('_q', '_c');
				$('#myModal .modal-body.flexslider').html('<img src="' + path + '" />');
				$('#myModal').modal('show');
				e.preventDefault();
				return false;

			});			
			
			$photoDiv.find('.nav a').on("click.getPhotoSet", function (e) {
				setID = $(this).data('setid');
				_self.Photoset.load(setID);
				e.preventDefault();
			});

		},
		/**
		 * tipsWeekly object.
		 * Modified: 07/09/2013
		 *
		 * @type {object}
		 * @author Craig Lucas <clucas@everydayhealthinc.com>
		 * @public
		 */
		Photoset : {

			/**
			 * Returns an object containing the given twitter photo set
			 * Modified: 09/21/2013
			 *
			 * @method getTwitterPhotoSet
			 * @param {number} setID - num of slides.
			 * @param {string or jq object} setID - num of slides.
			 * @author Craig Lucas <clucas@everydayhealthinc.com>
			 * @public
			 */
			load : function (setID) {

				var
				apiKey = '28a9103300057a9efeda07f46594bd53',
				apiCall,
				theData,
				_self = this,
				setID = setID != null ? setID : '72157635771860486';

				apiCall = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + apiKey + "&photoset_id=" + setID + "&format=json&jsoncallback=?";

				//SEND API CALL AND RETURN RESULTS TO A FUNCTION
				$.getJSON(apiCall, function (data) {
					theData = data.photoset.photo;
					//_self.slider.load(theData);
					_self.tab.load(theData);
				});

			},

			slider : {
				/**
				 * loads the slider
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				load : function (set) {

					// vars
					var html;

					this.setupObj();
					html = this.html(set);

					// create articleNav
					this.build(html);

					this.initialize(this);

				},

				/**
				 * setup the "tab" object
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				setupObj : function (set) {
					this.$tab = '#slider';
					this.flexSlider = '//cdnjs.cloudflare.com/ajax/libs/flexslider/2.2.0/jquery.flexslider-min.js';
					this.$carousel = $('.flexslider');
				},

				/**
				 * build html for tab
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				html : function (set) {

					// vars
					var full_src,
					link,
					listItem = [],
					_self = this,
					html,
					linkHtml,
					ct = 0;

					//LOOP THROUGH DATA
					$.each(set, function (i, photo) {

						//LINK TO IMAGE SOURCE
						full_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "c.jpg";
						link = "http://www.flickr.com/photos/100879861@N05/" + photo.id + "/in/set-72157635776920973/lightbox/";

						linkHtml = '<li><a data-toggle="modal" data-target="#myModal"><img data-src="' + full_src + '" class="lazy" /></a></li>';

						listItem[ct] = linkHtml;

						//increment array counter
						ct += 1;

					});

					// build html string
					html = listItem.join('');
					return html;

				},

				/**
				 * Build photoset tab <br>
				 * Modified: 08/29/2013
				 *
				 * @method build
				 * @param {object} _parent - Reference to CuSo.Storylogues
				 * @param {string} html - Share bar HTML.
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				build : function (html) {
					$('#slider').empty().append(html);
				},

				/**
				 * initialize flexslider <br>
				 * Modified: 08/29/2013
				 *
				 * @method build
				 * @param {object} _carousel - Reference to CuSo.Storylogues
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				initialize : function (_carousel) {
					// load flexslider
					$.getScript(_carousel.flexSlider).done(function () {

						// instantiate flexslider
						_carousel.$carousel.append()
						.addClass('carousel')
						.flexslider({
							animation : 'slide',
							animationLoop : false,
							animationSpeed : 1000,
							controlNav : false,
							directionNav : true,
							slideshow : true,
							smoothHeight : true,
							move : 1,
							touch : false,
							start : function (slide) {},
							after : function (slide) {}
						});
					});
				}
			},

			tab : {
				/**
				 * loads the tab
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				load : function (set) {

					// vars
					var html;

					this.setupObj();
					html = this.html(set);

					// create articleNav
					this.build(html);

					this.bindEvents();
				},

				/**
				 * setup the "tab" object
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				setupObj : function (set) {
					this.$tab = '#gallery';
				},

				/**
				 * build html for tab
				 * Modified: 09/21/2013
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				html : function (set) {

					// vars
					var full_src,
					link,
					listItem = [],
					_self = this,
					html,
					linkHtml,
					ct = 0;

					//LOOP THROUGH DATA
					$.each(set, function (i, photo) {

						//LINK TO IMAGE SOURCE
						full_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
						link = "http://www.flickr.com/photos/100879861@N05/" + photo.id + "/in/set-72157635776920973/lightbox/";

						linkHtml = '<li class="col-xs-6 col-sm-3 col-md-2"><a class="thumbnail"><img src="' + full_src + '" class="lazy" /></a></li>';

						listItem[ct] = linkHtml;

						//increment array counter
						ct += 1;

						//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV
						//$("<img/>").attr("src", full_src).attr('width', 200).addClass('lazy').appendTo("#slider").wrap(('<li class="col-md-3"><a class="thumbnail" data-remote="' + link +'" data-toggle="modal" data-target="#myModal"></a></li>'))

					});

					// build html string
					html = listItem.join('');
					return html;

				},

				/**
				 * Build photoset tab <br>
				 * Modified: 08/29/2013
				 *
				 * @method build
				 * @param {object} _parent - Reference to CuSo.Storylogues
				 * @param {string} html - Share bar HTML.
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				build : function (html) {
					$('#gallery').empty().append(html);
				},
				
				/**
				 * Build photoset tab <br>
				 * Modified: 08/29/2013
				 *
				 * @method build
				 * @param {object} _parent - Reference to CuSo.Storylogues
				 * @param {string} html - Share bar HTML.
				 * @author Craig Lucas <clucas@everydayhealthinc.com>
				 * @public
				 */
				
				bindEvents: function () {
					var $photoDiv = $('#weddingPhotos'),
					setID,
					img,
					path,
					_self = this;

					$photoDiv.find('#gallery .thumbnail').on("click.launchFullScreen", function (e) {
						//e.preventDefault();
						img = $(this).find('img');
						path = img.attr('src').replace('_q', '_c');
						$('#myModal .modal-body.flexslider').html('<img src="' + path + '" />');
						$('#myModal').modal('show');
						e.preventDefault();
						return false;

					});
				}
				

			}

		}
	};

	/**
	 * Instantiate object.
	 *
	 * @type {object}
	 * @see {@linkCJ.PhotoConstructor}
	 * @public
	 */
	CJ.Photo = new CJ.PhotoConstructor();

	// dom ready
	$(function () {

		// page init
		CJ.Photo.init();

	});

}
	(jQuery, window));
