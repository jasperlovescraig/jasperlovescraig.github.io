/**
 * @file Scripts specific to Honeymoon api
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
	CJ.HoneymoonConstructor = function () {       
        CJ.PhotoConstructor.call(this); // call super constructor.
    };    
    

    // subclass extends superclass
    CJ.HoneymoonConstructor.prototype = Object.create(CJ.PhotoConstructor.prototype);
    CJ.HoneymoonConstructor.prototype.constructor = CJ.HoneymoonConstructor;
    
    CJ.Honeymoon = new CJ.HoneymoonConstructor();
    
    CJ.Honeymoon.Photoset.load = function() {

        var
        apiKey = '28a9103300057a9efeda07f46594bd53',
        apiCall,
        theData,
        _self = this,
        setID = setID != null ? setID : '72157640683935334';

        apiCall = "http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=" + apiKey + "&photoset_id=" + setID + "&extras=description&format=json&jsoncallback=?";

        //SEND API CALL AND RETURN RESULTS TO A FUNCTION
        $.getJSON(apiCall, function (data) {
            theData = data;
            _self.slider.load(theData);
        });        
        
    };
    
    CJ.Honeymoon.Photoset.slider.events.bind = function (_slider  ) {
        
        var $photoDiv = $('#honeymoonPhotos'),
            $this,   
            _self = this;		
        
        // click event for thumbnail
        $photoDiv.find('a.allPicks').on("click.launchModal", function (e) {
            
            $('#slider').carousel(index);
            
            //launch the modal
            _slider.modal(e);
            
        });
         
        
    };

	// dom ready
	$(function () {

		// page init
		CJ.Honeymoon.init();

	});

}
	(jQuery, window));
