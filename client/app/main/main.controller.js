'use strict';

angular.module('meowmanApp')
  .controller('MainCtrl', function($scope, $http, socket) {
    $scope.list = [];

    $scope.addNote = function() {
      $scope.list.push(Math.floor(Math.random() * 4));
      console.log($scope.list);
    };

    $scope.play = function() {
      var index = 0;
      var intervalID = setInterval(function(){
        console.log($scope.list[index]);
        index++;

        if (index === $scope.list.length) {
          clearInterval(intervalID);
          console.log('Interval cleared!');
        }
      }, 1000);
    };

    $scope.pressButton = function(index) {
      console.log(index);
      if (index === $scope.list[$scope.userIndex]) {
        // correct
        $scope.userIndex++;

        if ($scope.userIndex === $scope.list.length) {
          //win
          $scope.userIndex = 0;
          console.log('Win!');
        }
      }
      else {
        // incorrect
        $scope.userIndex = 0;
        console.log('Lose!');
      }
    };

    $scope.userIndex = 0;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

  })

  .filter('range', function() {
    return function(input, total) {
      total = parseInt(total);
      for (var i=0; i<total; i++) {
        input.push(i);
      }
      return input;
    };
  });
