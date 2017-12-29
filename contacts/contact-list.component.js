'use strict';

angular.module('contactList').component('contactList', {
     templateUrl: '../contacts/contact-list.template.html',
      controller: function ContactListController($http) {
       var self = this;

       
        self.getData = (function() {
        $http.get('people.json').then(function(response) {
            angular.forEach(response.data.People, function(value, key) {
               response.data.People[key].id = key;
      });
            console.log(response.data.People);
        self.contacts = response.data.People;
      });
    })();
      
        
        self.search = function () {
          self.searchquery = angular.copy(self.query) ;
        }

        self.clear = function(){
          self.query = '';
          
        }
    }
  });