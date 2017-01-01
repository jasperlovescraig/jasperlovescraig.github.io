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
                CJ.Utilities.smoothAnchors(e.target.hash);     
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
			 * @method init
			 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
			 * @public
			 */
			init : function () {                
                
                // setup the photoset object
                this.setup();
                
                // only load set if it is not in session storage already
                if (this.storedSet !== null) {
                    
                    // load the tab with photoset
                   this.tab.load.call(this, this.storedSet);
                    
                }                                                                                            
                
                else {
                   this.load(this.defaultSet, 0, true, false);  
                    
                }                  
                
                // init events
                this.events.init(this);
                
            },

            /**
             * Setup the photoset object
             * Modified: 01/25/2014
             *
             * @method setup
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
			setup : function () {
                
                // twitter api key
                this.apiKey = '28a9103300057a9efeda07f46594bd53';
                
                // default set to load
                this.defaultSet = '72157635771860486';
                    
                // is set Loaded?
                this.storedSet =  CJ.Utilities.storage.session.get(this.defaultSet);
                
			},
            

            /**
             * load the given twitter wedding photo set
             * Modified: 01/25/2014
             *
             * @method load
             * @param {string} setID - set id number
             * @param {string} index - starting slide
             * @param {boolean} loadTab - Load tab with photoset?
             * @param {boolean} loadSlider - Load slider with photoset?
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
            load : function (setID, index, loadTab, loadSlider) {

                var _self = this,
                    apiCall;
                    
                apiCall = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + _self.apiKey + "&photoset_id=" + setID + "&user_id=100879861%40N05&format=json&jsoncallback=?";                    
                                                       
                    
                $.getJSON(apiCall).done(function(data) {                    
                    
                    if (loadTab) {
                        // load the tab with photoset
                        _self.tab.load.call(_self, data);
                    }
                    
                    if (loadSlider) {
                        // load the slider with photoset
                        _self.slider.load(data, index);
                    }
                    
                    // store result in session storage
                    CJ.Utilities.storage.session.set(setID, data);                        
                                                          
                });                                                                                     
                    

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
                 * init event methods
                 * Modified: 01/25/2014
                 *
                 * @method init
                 * @param {object} set - photoset object
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                 init: function (_photoset) {
                     this.weddingTabs(_photoset);
                     this.honeymoonPhotos(_photoset);
                 },
            
                /**
                 * bind click event to wedding tabs
                 * Modified: 01/25/2014
                 *
                 * @method weddingTabs
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                 
                weddingTabs: function (_photoset) {
                    
                    var $content = $('#weddingPhotos'),
                    $navLink,
                    $navLi,
                    navData,
                    storedSet;
                    
                    $content.find('a[data-setid]').on("click.getPhotoSet", function (e) {
                        
                        $navLink = $(this);
                        navData = $navLink.data();
                        storedSet =  CJ.Utilities.storage.session.get(navData.setid);
                        $navLi = $navLink.parent();
                        $navLi.addClass('active').siblings().removeClass('active');
                        
                         // if set is in session storage
                            if (storedSet !== null) {
                                
                                // load the tab with photoset
                               _photoset.tab.load.call(_photoset, storedSet);
                                
                            }                                                                                            
                            
                            else {
                                _photoset.load(navData.setid, 0, true, false);  
                                
                            }                        
                        
                        e.preventDefault();
                        
                    });

                    
                },
                 
                /**
                 * bind click event to honeymoon photos link
                 * Modified: 01/25/2014
                 *
                 * @method honeymoonPhotos
                 * @param {object} _photoset - Reference to CJ.Photo.Photoset
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                 
                honeymoonPhotos: function (_photoset) {
                    
                    var $content = $('#honeymoonPhotos'),
                    $navLink,
                    navData,
                    storedSet;
                    
                    $content.find('a[data-setid]').on("click.getPhotoSet", function (e) {
                        
                        $navLink = $(this);
                        navData = $navLink.data();
                        storedSet =  CJ.Utilities.storage.session.get(navData.setid);
                        
                         // if set is in session storage
                            if (storedSet !== null) {
                                
                                // load the slider with photoset
                               _photoset.slider.load(storedSet);
                                
                            }                                                                                            
                            
                            else {
                                _photoset.load(navData.setid, 0, false, true);  
                                
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
                 * @param {string} startingSlide - startingSlide
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				load : function (set, startingSlide) {

					// vars
					var html;

                    // setup slider
					this.setup();
                    
                    // build slider html
					html = this.html(set);

					// inject into DOM
					this.inject(html);
                    
                    // instantiate the slider
					this.instantiate(this, startingSlide); 
                    
                    this.modal.call(this);

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
                    
				    this.$modal = $('#myModal');
                    this.$modal.empty();
                    this.angTpl = $('#tpl-slider').html();
                        
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
				 * Inject photoset thumbnails to DOM <br>
				 * Modified: 08/29/2013
				 *
				 * @method inject
				 * @param {string} html - slider HTML.
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				inject : function (html) {
					this.$modal.append(html);
				},
               
                
				/**
				 * instantiate flexslider <br>
				 * Modified: 08/29/2013
				 *
				 * @method instantiate
				 * @param {object} _slider - Reference to CJ.Photo.Photoset.slider
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				instantiate : function (_slider, index) {
                    
                    var _self = this,
                        $slider = _slider.$modal.find('#slider'),
                        $firstItem = $slider.find('.item:first');
                                        
                                        
                    $slider.on('slide.bs.carousel', function (e) {
                        _self.slide(e);
                    });
                                     

                    $firstItem.addClass('active');
                    $firstItem.find('img').unveil();
                    
                    $slider.carousel({interval: false}).carousel(index);
                    
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
                    
                    this.$modal = $('#myModal');                            
                    
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
				load : function (set) {

					// vars
					var html;

                    // setup tab
					this.tab.setup();
                    
                    // build tab html
					html = this.tab.html(set);

					// inject into DOM
					this.tab.inject(html);
                    
                    // unveil images
                    this.tab.$tab.find("img").unveil(50);
                    
                    // thumbnail binding
                    this.tab.events.init.call(this);

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
				},
                
                /**
                 * events object.
                 * Modified: 01/25/2014
                 *
                 * @type {object}
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                  
                events: {
                    
                    /**
                     * init methods <br>
                     * Modified: 08/29/2013
                     *
                     * @method init
                     * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                     * @public
                     */                    
                    init: function() {
                        this.tab.events.thumbnail(this);
                    },
                    
                    /**
                     * thumbnail click method <br>
                     * Modified: 08/29/2013
                     *
                     * @method init
                     * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                     * @public
                     */                      
                      thumbnail: function (_photoset) {
                        
                        var $photoDiv = $('#weddingPhotos'),
                            index,
                            navData = $photoDiv.find('li.active a[data-setid]').data(),
                            storedSet =  CJ.Utilities.storage.session.get(navData.setid);
                        
                        // click event for thumbnail
                        $photoDiv.find('a.thumbnail').on("click.launchModal", function () {                            
                            
                            // get the index of thumbnail
                            index =  $(this).parent().index();   
                            
                            // only load set if it is not in session storage already
                            if (storedSet !== null) {
                                
                                // load the tab with photoset
                                _photoset.slider.load(storedSet, index);
                                      
                                
                            }                                                                                            
                            
                            else {
                                _photoset.load(navData.setid, index, false, true);                                
                            }
                            
                            
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
