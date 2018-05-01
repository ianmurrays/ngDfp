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

or npm:

    npm install ngDfp --save

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

Optionally, you can refresh an ad individually immediately or after a defined timeout:
```
<!-- Refresh this ad immediately -->
<div ng-dfp-ad="div-gpt-ad-1234567890123-0" ng-dfp-ad-refresh></div>
```
```
<!-- Refresh this ad after `refreshTimeout` seconds -->
<div ng-dfp-ad="div-gpt-ad-1234567890123-0" ng-dfp-ad-refresh-timeout="{{refreshTimeout}}"></div>
```

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

Responsive Ads
----------------
You can use Google Publisher Tags (GPT) to build responsive ads that fit the browser your visitors use to view your website. This means that your ads will look good whether your visitors are using a desktop, tablet, or smartphone.  
More information about [Building Responsive Ads](https://support.google.com/dfp_premium/answer/3423562?hl=en).

```
DoubleClickProvider.defineSlot('/123456/Your_Slot', [[970, 90], [728, 90], [88, 31]], 'div-gpt-ad-1431622560634-6');
DoubleClickProvider
    .defineSizeMapping('div-gpt-ad-1431622560634-6')
    .addSize([1024, 768], [970, 90])
    .addSize([980, 690], [728, 90])
    .addSize([640, 480], [728, 90])
    // Fits browsers of any size smaller than 640 x 480
    .addSize([0, 0], [88, 31]);
```

Minimizing
----------

Closure Compiler is used to minimize the code. It is minimized using this command

    closure-compiler --js_output_file=angular-dfp.min.js --compilation_level SIMPLE angular-dfp.js

Advanced optimizations are not used because as of now the AngularJS codebase does not support it.

Issues
------

Please file issues using GitHub's issue tracker.

Contributing
------------

Pull requests are more than welcome!
