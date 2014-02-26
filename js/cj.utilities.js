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
(function ($, w) {

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
		smoothAnchors : function (hash) {
            var $div = $(hash);
            
            $('html, body').stop().animate({
                'scrollTop': $div.offset().top
            }, 1200, 'swing');            

		},
        
        /**
		 * Storage object.
		 * Modified: 01/25/2014
		 *
		 * @type {object}
		 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
		 * @public
		 */        
        storage: {
            
            
            /**
             * Storage session object.
             * Modified: 01/25/2014
             *
             * @type {object}
             * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
             * @public
             */                 
            session: {
                
                /**
                 * store json object as string using sessionStorage
                 * Modified: 01/25/2014
                 *
                 * @method set
                 * @param {string} key - name of session storage item
                 * @param {object} obj - json object
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */ 
                set: function (key, obj) {
                    
                    // convert json object to string
                    obj = JSON.stringify(obj);
                    
                    w.sessionStorage.setItem(key, obj);                    
                
                },
                
                /**
                 * returns json object stored via sessionStorage
                 * Modified: 01/25/2014
                 *
                 * @method get
                 * @param {string} key - name of session storage item
                 * @returns {object} storageObj - 
                 * @author Craig Joseph Lucas <http://www.linkedin.com/in/craigjosephlucas>
                 * @public
                 */                 
                get: function (key) {
                    
                    var storageObj = {};
                    
                    // get session storage item value 
                    storageObj = w.sessionStorage.getItem(key);
                    
                    // convert to json object
                     storageObj = JSON.parse(storageObj);
                    
                    return storageObj;
                    
                }
                
            }
            
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
