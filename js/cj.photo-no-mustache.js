/**
 * @file Scripts specific to photo api
 * Created:  01/25/2014
 * Modified: 01/25/2014
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
	 * Creates an instance of PhotoConstructor
	 * Modified: 01/25/2014
	 *
	 * @constructor
	 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
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
		 * Modified: 01/25/2014
		 *
		 * @method init
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		init : function () {
			this.objectInit();
            this.bindEvents();
		},

		/**
		 * Initialize objects
		 * Modified: 01/25/2014
		 *
		 * @method objectInit
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		objectInit : function () {
			this.Photoset.load();
		},

		/**
		 * bind events
		 * Modified: 01/25/2014
		 *
		 * @method bindEvents
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		bindEvents : function () {
            
            this.$siteNav = $('#siteNav');
            
            // click event for thumbnail
            this.$siteNav.find('a').on("click.anchor", function (e) {
                e.preventDefault();
                CJ.Utilities.smoothAnchors(e);     
            });
            

		},

        /**
		 * Photoset object.
		 * Modified: 01/25/2014
		 *
		 * @type {object}
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		Photoset : {

			/**
			 * Loads the given twitter photo set
			 * Modified: 01/25/2014
			 *
			 * @method load
			 * @param {string} setID - set id number
			 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
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
					_self.tab.load(theData, _self);
                    _self.slider.load(theData);
				});

			},
            
            /**
             * Slider object.
             * Modified: 01/25/2014
             *
             * @type {object}
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
			slider : {
                
				/**
				 * loads the slider
				 * Modified: 01/25/2014
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				load : function (set) {

					// vars
					var html;

                    // setup slider
					this.setup();
                    
                    // build slider html
					html = this.html(set);

					// inject into DOM
					this.inject(html);
                    
                    // instantiate the slider
					this.instantiate(this, "1");
                    
                    // bind events
                    this.events.bind(this);

				},

				/**
				 * setup the "slider" object
				 * Modified: 01/25/2014
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				setup : function (set) {
                    
					this.$slider = $('#slider');
                    this.$sliderInner = this.$slider.find('.carousel-inner');
                    
                    // init image unveil plugin
                     $("img").unveil(50);
				},
                

				/**
				 * build html for slider
				 * Modified: 01/25/2014
				 *
				 * @method build
				 * @param {object} set - photoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
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
                        
                        if (ct === 0) {
                            linkHtml = '<div class="item active"><img src="' + full_src + '" + src="" + data-title="' + photo.title + '" /></div>';
                        }
                        
                        else {
                            linkHtml = '<div class="item"><img data-src="' + full_src + '" data-title="' + photo.title + '" /></div>';
                        }

						listItem[ct] = linkHtml;

						//increment array counter
						ct += 1;

					});
                    
                    // build html string
                    html = listItem.join('');
					
                    return html;

				},

				/**
				 * Inject photoset tab to DOM <br>
				 * Modified: 08/29/2013
				 *
				 * @method inject
				 * @param {string} html - Share bar HTML.
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				inject : function (html) {
					this.$sliderInner.empty().append(html);
				},

                /**
                 * events object.
                 * Modified: 01/25/2014
                 *
                 * @type {object}
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                 events : {
                     
                    /**
                     * bind events for slider <br>
                     * Modified: 08/29/2013
                     *
                     * @method bind
                     * @param {object} _slider - Reference to CJ.Photo.Photoset.slider
                     * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                     * @public
                     */                                          
                    bind: function (_slider) {
                        
                        var $photoDiv = $('#weddingPhotos'),
                        $thumb,
                        index,    
                        _self = this;		
                        
                        // click event for thumbnail
                        $photoDiv.find('a.thumbnail').on("click.launchModal", function (e) {
                            
                            $thumb = $(this);
                            
                            index = $thumb.parent().index();
                            
                            $('#slider').carousel(index);
                            
                            //launch the modal
                            _slider.modal(e);
                            
                        });

                        
                    }                        
                     
                 },                
                
				/**
				 * instantiate flexslider <br>
				 * Modified: 08/29/2013
				 *
				 * @method instantiate
				 * @param {object} _slider - Reference to CJ.Photo.Photoset.slider
                 * @param {object} index - starging slide number
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				instantiate : function (_slider) {
                    
                    var _self = this;
                                        
                    // instantiate flexslider
                    _slider.$slider.append()
                    .addClass('carousel')
                    .carousel({
                        interval: false
                    });
                    
                    _slider.$slider.on('slide.bs.carousel', function (e) {
                        _self.slide(e);
                    });                                                            
				},
                
				/**
				 * Slider Slide Method <br>
				 * Modified: 08/29/2013
				 *
				 * @method slide
                 * @param {object} event - slider event object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */  
                 slide : function (event) {
                    
                    var $activeSlide,
                        $nextSlide,
                        $activeImage;                    
                    
                    $activeSlide = $(event.target).find('.carousel-inner > .item.active');
                    $nextSlide = $(event.relatedTarget);
                    $activeImage = $nextSlide.find('img');
                    
                    $activeImage.attr('src', $activeImage.data('src'));
                     
                 },
                
				/**
				 * Launch the Slider Modal<br>
				 * Modified: 08/29/2013
				 *
				 * @method modal
                 * @param {object} event - slider event object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */ 
                modal: function (e) {
                    
                    var title = $('#weddingPhotos .active a').data('title');
                    
                    this.$modal = $('#myModal');
                    this.$modal.find('.modal-title').html(title);
                    this.$modal.modal('show');
                }
                
                
			},
            
            /**
             * Tab object.
             * Modified: 01/25/2014
             *
             * @type {object}
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */            
			tab : {
				/**
				 * loads the tab
				 * Modified: 01/25/2014
				 *
				 * @method load
				 * @param {object} set - photoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				load : function (set, _photoset) {

					// vars
					var html;

                    // setup tab
					this.setup(_photoset);
                    
                    // build tab html
					html = this.html(set);

					// inject into DOM
					this.inject(html);
                    
                    // instantiate the slider
					//this.instantiate(this);

				},

				/**
				 * setup the "tab" object
				 * Modified: 01/25/2014
				 *
				 * @method setup
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				setup : function (_photoset) {
					
                    this.$tab = $('#gallery');
                    this.events.bind(_photoset);
                    
				},

				/**
				 * build html for tab
				 * Modified: 01/25/2014
				 *
				 * @method html
				 * @param {object} set - photoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
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

						linkHtml = '<li class="col-xs-6 col-sm-3 col-md-2"><a class="thumbnail"><img src="http://dummyimage.com/1x1/000/fff" data-src="' + full_src + '" class="lazy" /></a></li>';

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
				 * Inject photoset tab to DOM <br>
				 * Modified: 08/29/2013
				 *
				 * @method inject
				 * @param {string} html - Tab HTML.
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				inject : function (html) {
					this.$tab.empty().append(html);
				},
                
                /**
                 * events object.
                 * Modified: 01/25/2014
                 *
                 * @type {object}
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                 events : {
                     
                    bind: function (_photoset) {
                        
                        var $photoDiv = $('#weddingPhotos'),
                        setID,
                        img,
                        path,
                        $navLink,
                        $navLi,    
                        _self = this;		
                        
                        $photoDiv.find('.nav a').on("click.getPhotoSet", function (e) {
                            $navLink = $(this);
                            setID = $navLink.data('setid');
                            $navLi = $navLink.parent();
                            $navLi.addClass('active').siblings().removeClass('active');
                            
                            _photoset.load(setID);
                            e.preventDefault();
                        });

                        
                    }                        
                     
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
