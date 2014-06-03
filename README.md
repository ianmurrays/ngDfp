ngDfp
=====

ngDfp is a simple library for Angular JS that allows you to add DoubleClick for Publishers tags to your Angular site.

Getting Started
---------------

Simply add `angular-dfp.js` to your project, include it as a dependency:

    angular.module('your.module', ['ngDfp'])

and configure your slots in your app's config:

    .config(function (DoubleClickProvider) {
      DoubleClickProvider.defineSlot('/123456/Your_Slot', [100, 500], 'div-gpt-ad-1234567890123-0')
                         .defineSlot('/123456/Your_Slot', [300, 200], 'div-gpt-ad-1234567890123-1');
    });

Now, to show an ad, simply use the `ng-dfp-ad`:

    <div data-ng-dfp-ad="div-gpt-ad-1234567890123-0"></div>

Issues
------

Please file issues using GitHub's issue tracker.

Contributing
------------

Pull requests are more than welcome!
