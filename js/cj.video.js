/**
 * @file Scripts specific to Video api
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
	 * Creates an instance of VideoConstructor
	 * Modified: 01/25/2014
	 *
	 * @constructor
	 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
	 */
	CJ.VideoConstructor = function () {};

	/**
	 * Inheritable methods.
	 *
	 * @type {object}
	 */
	CJ.VideoConstructor.prototype = {

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
			//this.bindEvents();
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
			this.Videoset.Tab.setup();
		},

        /**
		 * Videoset object.
		 * Modified: 01/25/2014
		 *
		 * @type {object}
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		Videoset : {
        
            /**
             * Tab object.
             * Modified: 01/25/2014
             *
             * @type {object}
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */            
			Tab : {
                
                /**
				 * loads the tab
				 * Modified: 01/25/2014
				 *
				 * @method load
				 * @param {object} set - Videoset object
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				load : function (set) {

					// vars
					var html;
                    
                    // build tab html
					html = this.html(set);

					// inject into DOM
					this.inject(html);

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
					
                    this.$videoTab = $('#videoTab');
                    this.initialConfig = $('#weddingVideos a[data-initial-video="true"]').data();
                    
                    // load the video tab
                    this.load(this.initialConfig);
                    
                    // bind events
                    this.events.bind(this);
                    
				},

				/**
				 * build html for tab
				 * Modified: 01/25/2014
				 *
				 * @method html
				 * @param {object} videoData - Video data config 
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				html : function (videoData) {
                    
                    // vars
                    var html;					
                    
                    // if there is a video src lets build iframe html
                    if (videoData.videoSrc.length > 0 ) {
                        
                        // add video title                        
                        html = '<h3>' + videoData.videoTitle + '</h3>';
                        
                        html += '<div class="video-container"><iframe src="' + videoData.videoSrc + '" width="' + videoData.videoWidth + '" height="'+ videoData.videoHeight + 'webkitallowfullscreen="true" mozallowfullscreen="true" scrolling="no" frameborder="0" style="border: none; overflow: hidden;" /></div>';
                       
                       // add in video description    
                       html += '<div class="description"><p>' + videoData.videoDescription + '</p></div>';
                        
                    }                    
                    
					return html;

				},

				/**
				 * Inject Videoset tab to DOM <br>
				 * Modified: 08/29/2013
				 *
				 * @method inject
				 * @param {string} html - Tab HTML.
				 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
				 * @public
				 */
				inject : function (html) {
					this.$videoTab.empty().append(html);
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
                     
                    bind: function (_tab) {
                        var $tabLinks = $('#weddingVideos .nav a'),
                        videoData,
                        $link,
                        $navLi,    
                        _self = this;
    
                        // bind click event for loading tab
                        $tabLinks.on("click.loadTab", function (e) {
                            
                            $link = $(this);
                            $navLi = $link.parent();
                            videoData = $link.data();
                            $navLi.addClass('active').siblings().removeClass('active');
                            e.preventDefault();  
                            _tab.load(videoData);
                            
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
	 * @see {@linkCJ.VideoConstructor}
	 * @public
	 */
	CJ.Video = new CJ.VideoConstructor();

	// dom ready
	$(function () {

		// page init
		CJ.Video.init();

	});

}
	(jQuery, window));
