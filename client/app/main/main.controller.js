'use strict';

angular.module('meowmanApp')
  .controller('MainCtrl', function($scope, $http, socket, $interval, $timeout, SoundFactory) {

    $scope.list = [];
    $scope.started = false;
    $scope.playing = false;

    var startString = 'Start Game!';
    var nextString = 'Start Next Level!';
    var endString = 'Quit Game!';

    $scope.startBtnString = startString;
    $scope.nextBtnString = nextString;
    $scope.endBtnString = endString;

    $scope.startGame = function() {
      $scope.started = true;
      $scope.playing = true;
      $scope.addNote();
      $scope.play();
    };

    $scope.startNextLevel = function() {
      $scope.addNote();
      $scope.play();
    };

    $scope.stopGame = function() {
      $scope.initialize();
    };

    $scope.addNote = function() {
      $scope.list.push(Math.floor(Math.random() * 4));
      console.log($scope.list);
      return true;
    };

    $scope.playItem = null;
    $scope.time = 1050;
    $scope.play = function() {
      var index = 0;
      var timeoutId;

      var intervalID = $interval(function() {
        $scope.playItem = $scope.list[index];

        switch($scope.list[index]) {
          case 0:
            SoundFactory.meow0.play();
            break;
          case 1:
            SoundFactory.meow1.play();
            break;
          case 2:
            SoundFactory.meow2.play();
            break;
          case 3:
            SoundFactory.meow3.play();
            break;
        }

        timeoutId = $timeout(function() {
            $scope.playItem = null;
        }, 200);
        index++;

        if (index === $scope.list.length) {
          timeoutId.then(function() {
            $interval.cancel(intervalID);

            if ($scope.time > 200) {
              $scope.time -= 50;
              console.log($scope.time);
            }
          });
        }
      }, $scope.time);
    };

    $scope.pressButton = function(index) {
      console.log(index);

      switch(index) {
          case 0:
            SoundFactory.meow0.play();
            break;
          case 1:
            SoundFactory.meow1.play();
            break;
          case 2:
            SoundFactory.meow2.play();
            break;
          case 3:
            SoundFactory.meow3.play();
            break;
        }


      if (index === $scope.list[$scope.userIndex]) {
        // correct
        $scope.userIndex++;

        if ($scope.userIndex === $scope.list.length) {
          //win
          $scope.userIndex = 0;

          $scope.playing = false;
        }
      }
      else {
        // incorrect
        $scope.initialize();
      }
    };

    $scope.initialize = function() {
      $scope.userIndex = 0;
      $scope.time = 1050;
      $scope.started = false;
      $scope.playing = false;
      $scope.list = [];
    };

    $scope.cats = [
        'cat_dj.gif',
        'cat_piano.jpg',
        'cat_string.gif',
        'cat_sunglasses.jpg'
    ];

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