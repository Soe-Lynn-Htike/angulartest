'use strict';

angular.module('contactDetail').component('contactDetail', {
	templateUrl: '../contacts/contact-detail-template.html',
    controller: ['$routeParams','$http','$uibModal',
      function ContactDetailController($routeParams,$http,$uibModal) {

      	 var self = this;
      	 $http.get('people.json').then(function(response) {

  	    self.person = response.data.People[$routeParams.Id];
		self.likes = self.person.Likes;
		self.dislikes = self.person.Dislikes;
		self.messages = new Array();


		self.rows = (function() {
			var list = [];
			if(self.likes.length >= self.dislikes.length) {
				for(var i = 0; i < self.likes.length; i++) {
					var dislike = self.dislikes[i];
					if(self.dislikes[i] === undefined) {
						dislike = "";
					}
					list.push({like: self.likes[i], dislike: dislike})
				}
			}
			else {
				for(var i = 0; i < self.dislikes.length; i++) {
					var like = self.likes[i];
					if(self.likes[i] === undefined) {
						like = "";
					}
					list.push({like: like, dislike: self.dislikes[i]})
				}
			}
			return list;
		})();

		/* self.message = function() {

      		var messagecontent = prompt("Type your message", "");
      		if(messagecontent){
        		self.messages.push(messagecontent);
      		}
		}*/
		self.message = function(){

		 var modalInstance = $uibModal.open({
          templateUrl: '../contacts/popup.html',
          controller: function ($scope, $uibModalInstance) {

          	
        	$scope.ok = function () {
            console.log("Coming here",$scope.searchTerm);
            if($scope.searchTerm){
            	self.messages.push($scope.searchTerm);
            }
          	$uibModalInstance.close();
        	};
      
        	$scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      	}

        });

		}

		self.hearts = self.person.rating;
		$(document).ready(function() {
			for(var i = 0; i < 5; i++) {
				var $heart = $('<span>');
				if(i + 1 <= self.hearts) {
					$heart.addClass('glyphicon glyphicon-heart')
				}
				else {
					$heart.addClass('glyphicon glyphicon-heart-empty')
				}
				$('#hearts').append($heart)
			}
		})
      });
        
      }
    ]
  });