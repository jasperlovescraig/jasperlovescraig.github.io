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
			this.Photoset.init();
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
            
            // init image unveil plugin
            $("img").unveil(50);             
            

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
			 * init the photoset
			 * Modified: 01/25/2014
			 *
			 * @method load
			 * @param {string} setID - set id number
			 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
			 * @public
			 */
			init : function () {
                
                // setup the photoset object
                this.objectInit();
                
                // bind events
                this.events.bind(this);
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
                
                // twitter api key
                this.apiKey = '28a9103300057a9efeda07f46594bd53';
                
                // this will store the jqxhr object
                this.jqxhr = {};
                
                // this will store the given photoset data that is returned
                this.theData = {};
                
                // call the wedding load method
                this.wedding.load(null, this);                
                
                // call the honeymoon load method
                this.honeymoon.load(null, this);

			},
            
            
            wedding : {

                /**
                 * Loads the given twitter wedding photo set
                 * Modified: 01/25/2014
                 *
                 * @method load
                 * @param {string} setID - set id number
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                load : function (setID, _photoset) {
    
                    var _self = this,
                        apiCall
                        
                    setID = setID !== null ? setID : '72157635771860486';    
                                                           
                    if (sessionStorage.getItem(setID) !== null) {                         
                        _photoset.theData = JSON.parse(sessionStorage.getItem(setID));
                        _photoset.tab.load(_photoset.theData, _self);
                        _photoset.slider.load(_photoset.theData);                            
                        
                    }

                    else {
                         
                        apiCall = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + _photoset.apiKey + "&photoset_id=" + setID + "&format=json&jsoncallback=?";
                        
                        _photoset.jqxhr = $.getJSON(apiCall, function () {});
                        
                        _photoset.jqxhr.success(function(data) {
                            sessionStorage.setItem(setID, JSON.stringify(data));
                            _photoset.tab.load(data, _self);
                            _photoset.slider.load(data.theData);                              
                        });
                            
                    }                                      
    
                },
                
                /**
                 * Make ajax call to get the wedding photo set
                 * Modified: 01/25/2014
                 *
                 * @method load
                 * @param {string} setID - set id number
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                
                get : function (setID, _photoset) {
                    

                }
                
            },
            
            honeymoon : {
                
                /**
                 * Loads the given twitter honeymoon photo set
                 * Modified: 01/25/2014
                 *
                 * @method load
                 * @param {string} setID - set id number
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                load : function (setID, _photoset) {
    
                    var apiCall;
							
                        setID = setID !== null ? setID : '72157635771860486';
                        apiCall = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + _photoset.apiKey + "&photoset_id=" + setID + "&format=json&jsoncallback=?";
    
                    //SEND API CALL AND RETURN RESULTS TO A FUNCTION
                    _photoset.jqxhr = $.getJSON(apiCall, function () {});
                    
                    _photoset.jqxhr.success(function(data) {                
                        _photoset.theData = data;
                        _photoset.slider.load(_photoset.theData);
                    });
    
                }                
                
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
                 * bind photoset events
                 * Modified: 01/25/2014
                 *
                 * @method bind
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                 
                bind: function (_photoset) {
                    
                    var $content = $('#content'),
                    $navLink,
                    $navLi,
                    navData;	
                    
                    $content.find('a[data-setid]').on("click.getPhotoSet", function (e) {
                        
                        $navLink = $(this);
                        navData = $navLink.data();
                        $navLi = $navLink.parent();
                        $navLi.addClass('active').siblings().removeClass('active');                        
                        
                        if (typeof _photoset[navData.setType].load === 'function') {
                        
                            // load the photoset 
                            _photoset[navData.setType].load(navData.setid, _photoset);
                                                        
                        }
                        
                        e.preventDefault();
                        
                    });

                    
                }                        
                 
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
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				setup : function () {
                    
					this.$slider = $('#slider');
                    this.$sliderInner = this.$slider.find('.carousel-inner');
                    this.angTpl = $('#tpl-slider-item').html();
                        
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

                    var html;
                                        
                    html = Mustache.to_html(this.angTpl, set);
                    
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
                        index;	
                        
                        // click event for thumbnail
                        $photoDiv.find('a.thumbnail').on("click.launchModal", function () {
                            
                            $thumb = $(this);
                            
                            index = $thumb.parent().index();
                            
                            $('#slider').carousel(index);
                            
                            //launch the modal
                            _slider.modal();
                            
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
                    
                    var _self = this,
                        $firstItem = _slider.$slider.find('.item:first');
                                        
                    // instantiate flexslider
                    _slider.$slider
                    .addClass('carousel')
                    .carousel({
                        interval: false
                    });
                    
                    _slider.$slider.on('slide.bs.carousel', function (e) {
                        _self.slide(e);
                    });                       

                    $firstItem.addClass('active');
                    $firstItem.find('img').unveil();
                    
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
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */ 
                modal: function () {
                    
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
                    
                    this.$tab.find("img").unveil(50);

				},

				/**
				 * setup the "tab" object
				 * Modified: 01/25/2014
				 *
				 * @method setup
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				setup : function () {
					
                    this.$tab = $('#gallery');
                    this.angTpl = $('#tpl-thumbnail-item').html();
                    
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

                    var html;
                                        
                    html = Mustache.to_html(this.angTpl, set);
                    
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
