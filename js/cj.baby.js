/**
 * @file Scripts specific to Baby api
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
	 * Creates an instance of BabyConstructor
	 * Modified: 01/25/2014
	 *
	 * @constructor
	 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
	 */
	CJ.BabyConstructor = function () {};

	/**
	 * Inheritable methods.
	 *
	 * @type {object}
	 */
	CJ.BabyConstructor.prototype = {

		/**
		 * Initialization methods.
		 * Modified: 01/25/2014
		 *
		 * @method init
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		init : function () {
			this.objectInit.call(this);
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
			this.Modal.setup.call(this);
		},

        /**
		 * Modal object.
		 * Modified: 01/25/2014
		 *
		 * @type {object}
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		Modal: {
                
            /**
             * loads the tab
             * Modified: 01/25/2014
             *
             * @method load
             * @param {object} set - Babyset object
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
            load : function (set) {

                // vars
                var html;
                
                // build html
                html = this.Modal.html.call(this);

                // inject into DOM
                this.Modal.inject.call(this, html);
                
                // bind events
                this.Modal.events.close.call(this);

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
                
                this.Modal.$modal = $('#myModal');
                this.Modal.$content = $('#ourBaby');
                
                // load the baby modal
                this.Modal.load.call(this);
                
            },

            /**
             * build html for modal
             * Modified: 01/25/2014
             *
             * @method html
             * @param {object} videoData - Baby data config 
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
            html : function () {
                
                var html,
                    title =  this.Modal.$content.find('header h2').html(),
                    intro = this.Modal.$content.find('.intro').html(),
                    content = this.Modal.$content.find('.latest').html();
                
                // header
                html = '<div class="modal-dialog"><div class="modal-content baby-modal">';
                html += '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h2 class="modal-title" id="myModalLabel">'+ title +'</h2></div>';
                
                html += '<div class="modal-body flexslider">'+ intro + content +'</div>';
                html += '<div class="modal-footer"><button type="button" class="btn btn-default btn-lg btn-block" data-dismiss="modal">See our photos</button>    </div></div></div>';
                return html;

            },

            /**
             * Inject Babyset tab to DOM <br>
             * Modified: 08/29/2013
             *
             * @method inject
             * @param {string} html - Tab HTML.
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */
            inject : function (html) {
                this.Modal.$modal.html(html).modal('show')
            },
            
            events: {
                
                /**
                 * Close modal event <br>
                 * Modified: 08/29/2013
                 *
                 * @method close
                 * @param {string} html - Tab HTML.
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */
                close : function (html) {
                    
                    this.Modal.$modal.find('.modal-footer button').on('click.close', function (e) {

                        CJ.Utilities.smoothAnchors('#ourBaby');
                        
                    })
                }                 
                
            }           

		}
	};

	/**
	 * Instantiate object.
	 *
	 * @type {object}
	 * @see {@linkCJ.BabyConstructor}
	 * @public
	 */
	CJ.Baby = new CJ.BabyConstructor();

	// dom ready
	$(function () {

		// page init
		CJ.Baby.init();

	});

}
	(jQuery, window));
