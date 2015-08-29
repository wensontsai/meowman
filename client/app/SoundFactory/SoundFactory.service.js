'use strict';

angular.module('meowmanApp')
  .factory('SoundFactory', function () {
    return {
      meow0: new Howl({
        urls: ['./assets/sounds/meow1.m4a']
      }),
      meow1: new Howl({
        urls: ['./assets/sounds/meow2.m4a']
      }),
      meow2: new Howl({
        urls: ['./assets/sounds/meow3.m4a']
      }),
      meow3: new Howl({
        urls: ['./assets/sounds/meow4.m4a']
      })
    };
  });