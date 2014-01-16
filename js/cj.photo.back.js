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
	CJ.PhotoConstructor = function () {
           
         };

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
			this.Flickr.getFlickrPhotoSet();
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
			    _self = this;	
			    
			$photoDiv.find('.nav a').on( "click.getPhotoSet", function(e) {
				//setID = $(this).data('setid');
				//_self.Flickr.getFlickrPhotoSet(setID);
				//e.preventDefault();
				return false;
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
		Flickr : {
			
			api: '28a9103300057a9efeda07f46594bd53',
			
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
			getFlickrPhotoSet : function (setID) {
 				

				var apiCall,
				 _self = this,
                		thumb_src,
				full_src,
 				link,
				setID = setID != null ? setID : '72157635771860486',
				apiCall = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + this.api + "&photoset_id=" + setID + "&format=json&jsoncallback=?",
				theData;
	
				$('#gallery').empty();

				//SEND API CALL AND RETURN RESULTS TO A FUNCTION
				$.getJSON(apiCall, function (data) {
					theData = data.photoset.photo;

					//LOOP THROUGH DATA
					$.each(data.photoset.photo, function (i, photo) {
						

						//LINK TO IMAGE SOURCE
						thumb_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "m.jpg";
						full_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "z.jpg";

                                                link = "http://www.flickr.com/photos/100879861@N05/" + photo.id + "/in/set-72157635776920973/lightbox/";

						//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV
						$("<img/>").attr("data-original", thumb_src).attr('width', 200).addClass('lazy').appendTo("#gallery").wrap(('<li class="col-md-3"><a class="thumbnail" data-remote="' + link +'" data-toggle="modal" data-target="#myModal"></a></li>'))


						//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV
						$("<img/>").attr("src", full_src).attr('width', 200).addClass('lazy').appendTo("#slider").wrap(('<li class="col-md-3"><a class="thumbnail" data-remote="' + link +'" data-toggle="modal" data-target="#myModal"></a></li>'))

					});

				});
				alert(theData);
				
				                                

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
