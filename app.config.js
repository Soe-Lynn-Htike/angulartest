'use strict';

angular.
  module('contactApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          templateUrl: 'contacts/contact-list-default.html'
        })
        .when('/person/:Id', {
          template: '<contact-detail> </contact-detail>'
        })
        .otherwise('/');
    }
  ]);