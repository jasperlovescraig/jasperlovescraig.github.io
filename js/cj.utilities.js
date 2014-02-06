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
	 * Creates an instance of UtilitiesConstructor
	 * Modified: 01/25/2014
	 *
	 * @constructor
	 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
	 */
	CJ.UtilitiesConstructor = function () {};

	/**
	 * Inheritable methods.
	 *
	 * @type {object}
	 */
	CJ.UtilitiesConstructor.prototype = {


		/**
		 * smooth sliding anchors
		 * Modified: 01/25/2014
		 *
		 * @method smoothAnchors
         * @param {object} event - click event object
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */
		smoothAnchors : function (event) {
            var $a = $(event.target.hash);
            
            $('html, body').stop().animate({
                'scrollTop': $a.offset().top
            }, 1200, 'swing');            

		}
        
	};

	/**
	 * Instantiate object.
	 *
	 * @type {object}
	 * @see {@linkCJ.UtilitiesConstructor}
	 * @public
	 */
	CJ.Utilities = new CJ.UtilitiesConstructor();


}
	(jQuery, window));
