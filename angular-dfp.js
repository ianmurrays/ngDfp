'use strict';

var googletag     = googletag || {};
    googletag.cmd = googletag.cmd || [];

angular.module('ngDfp', [])
  .constant('ngDfpUrl', '//www.googletagservices.com/tag/js/gpt.js')

  .provider('DoubleClick', ['ngDfpUrl', function (ngDfpUrl) {
    /**
     Holds slot configurations.
     */
    var slots = {};

    /**
     This initializes the dfp script in the document. Loosely based on angular-re-captcha's
     method of loading the script with promises.

     @link https://github.com/mllrsohn/angular-re-captcha/blob/master/angular-re-captcha.js
     */
    this._createTag = function (callback) {
      var gads   = document.createElement('script'),
          useSSL = 'https:' === document.location.protocol,
          node   = document.getElementsByTagName('script')[0];

      gads.async = true;
      gads.type  = 'text/javascript';
      gads.src   = (useSSL ? 'https:' : 'http:') + ngDfpUrl;
      
      // Insert before any JS include.
      node.parentNode.insertBefore(gads, node);

      gads.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          callback();
        }
      };

      gads.onload = callback;
    };

    /**
     Initializes and configures the slots that were added with defineSlot.
     */
    this._initialize = function () {
      angular.forEach(slots, function (slot) {
        googletag.defineSlot.apply(null, slot).addService(googletag.pubads());
      });

      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    };

    /**
     Stores a slot definition.
     */
    this.defineSlot = function () {
      slots[arguments[2]] = arguments;

      // Chaining.
      return this;
    };

    // Public factory API.
    var self  = this;
    this.$get = ['$q', '$window', function ($q, $window) {
      // Neat trick from github.com/mllrsohn/angular-re-captcha
      var deferred = $q.defer();

      self._createTag(function () {
        self._initialize();
        deferred.resolve();
      });
      
      return {
        /**
         More than just getting the ad size, this 
         allows us to wait for the JS file to finish downloading and 
         configuring ads
         */
        getAdSize: function (id) {
          return deferred.promise.then(function () {
            // Return the size of the ad. The directive should construct
            // the tag by itself.
            var slot = slots[id];

            if (angular.isUndefined(slot)) {
              throw 'Slot ' + id + ' has not been defined. Define it using DoubleClickProvider.defineSlot().';
            }

            return slots[id][1];
          });
        },

        runAd: function (id) {
          $window.googletag.display(id);
        }
      };
    }];
  }])

  .directive('ngDfpAd', ['$timeout', 'DoubleClick', function ($timeout, DoubleClick) {
    return {
      restrict: 'A',
      template: '<div id="{{adId}}"></div>',
      replace: true,
      link: function (scope, iElement, iAttrs) {
        var id         = iAttrs.ngDfpAd;
        
        scope.adId = id;

        DoubleClick.getAdSize(id).then(function (size) {
          iElement.css('width', size[0]).css('height', size[1]);
          $timeout(function () {
            DoubleClick.runAd(id);
          });
        });
      }
    };
  }]);
