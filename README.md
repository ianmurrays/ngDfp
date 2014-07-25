ngDfp
=====

ngDfp is a simple library for Angular JS that allows you to add DoubleClick for Publishers tags to your Angular site.

Requirements
------------

This library requires Angular JS 1.2 or higher. It might work with older versions but I can't guarantee it.

Getting Started
---------------

Just install via bower:

    bower install ngDfp --save

Then, include it as a dependency:

    angular.module('your.module', ['ngDfp'])

and configure your slots in your app's config:

    .config(function (DoubleClickProvider) {
      DoubleClickProvider.defineSlot('/123456/Your_Slot', [100, 500], 'div-gpt-ad-1234567890123-0')
                         .defineSlot('/123456/Your_Slot', [300, 200], 'div-gpt-ad-1234567890123-1');
    });

Now, to show an ad, simply use the `ng-dfp-ad`:

    <div data-ng-dfp-ad="div-gpt-ad-1234567890123-0"></div>

Refreshing Ads
--------------

Ads can be refreshed with a global interval or individually. To configure a global interval:

    // Refresh all ads every 30 seconds
    DoubleClickProvider.setRefreshInterval(30000);

To refresh an ad individually you can do two things:

    <!-- Refresh this ad every `refreshInterval` seconds -->
    <div ng-dfp-ad="div-gpt-ad-1234567890123-0" ng-dfp-ad-refresh-interval="{{refreshInterval}}"></div>
    
Or programatically with the provider:

    app.controller(function (DoubleClick) {
      DoubleClick.refreshAds('div-gpt-ad-1234567890123-0', 'div-gpt-ad-1234567890123-1');
    });

Hiding Emtpy Ads
----------------

Ads can be hidden by adding the attribute `data-ng-dfp-ad-hide-when-empty` to the ad tag. You have to 
specify the container of the ad using the data-ng-dfp-ad-container directive. This is useful if you contain
the ad in a parent div with some styles. For example, the following snippet will hide itself when empty:

    <div data-ng-dfp-ad="div-gpt-ad-1234567890123-0" data-ng-dfp-ad-hide-when-empty data-ng-dfp-ad-container></div>

And the following will hide the container

    <div class="my-fancy-ad-container" data-ng-dfp-ad-container>
      <div data-ng-dfp-ad="div-gpt-ad-1234567890123-0" data-ng-dfp-ad-hide-when-empty></div>
    </div>

Issues
------

Please file issues using GitHub's issue tracker.

Contributing
------------

Pull requests are more than welcome!
