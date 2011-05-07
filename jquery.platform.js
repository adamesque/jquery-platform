/*!
 * jQuery Platform Plugin.
 * https://github.com/jvduf
 *
 * Copyright 2011 Jeroen van Duffelen (@jvduf)
 * Released under MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Inspired by Sencha Touch by Sencha - http://sencha.com
 */


 (function($) {


    jQuery.extend({
        platform: function(options) {
            var me = this,
            platformData = $(window).data('platform');

            // Check if platformData is already defined on the window,
            // if returns true do not do the platform check but return
            // the data.
            if (platformData) {
                return platformData;
            };

            // Attach platform data to the window;
            $(window).data('platform', {});
            platformData = $(window).data('platform');

            // Define the platforms to check for.
            var platforms = [
            {
                property: 'platform',
                regex: /iPhone/i,
                identity: 'iPhone'
            },
            {
                property: 'platform',
                regex: /iPod/i,
                identity: 'iPod'
            },
            {
                property: 'userAgent',
                regex: /iPad/i,
                identity: 'iPad'
            },
            {
                property: 'userAgent',
                regex: /Blackberry/i,
                identity: 'Blackberry'
            },
            {
                property: 'userAgent',
                regex: /Android/i,
                identity: 'Android'
            },
            {
                property: 'platform',
                regex: /Mac/i,
                identity: 'Mac'
            },
            {
                property: 'platform',
                regex: /Win/i,
                identity: 'Windows'
            },
            {
                property: 'platform',
                regex: /Linux/i,
                identity: 'Linux'
            }
            ];

            var ln = platforms.length,
            i,
            platform;

            navigator = navigator || window.navigator;

            // Loop through all the defined platforms and do a regex
            // test on the platform string to define which platform
            // is being used.
            for (i = 0; i < ln; i++) {
                platform = platforms[i];
                platformData[platform.identity] = platform.regex.test(navigator[platform.property]);
            };

            // Based on the platform, define the device type.
            platformData['desktop'] = platformData['Mac'] || platformData['Windows'] || (platformData['Linux'] && !platformData['Anroid']);
            platformData['tablet'] = platformData['iPad'];
            platformData['phone'] = !platformData['desktop'] && !platformData['tablet'];
            platformData['iOS'] = platformData['iPhone'] || platformData['iPad'] || platformData['iPod'];

            // Define if this is opened as a standalone app on iOS.
            platformData['standalone'] = !!window.navigator.standalone;

            return platformData;
        }
    });


})(jQuery);