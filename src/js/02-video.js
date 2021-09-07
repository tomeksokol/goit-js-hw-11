'use strict';

import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'videoplayer-current-time';
const setATime = seconds => localStorage.setItem(LOCALSTORAGE_KEY, seconds);
const getATime = () => localStorage.getItem(LOCALSTORAGE_KEY);
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const settingTime = videoTime => {
  player
    .setCurrentTime(videoTime())
    .then(function (seconds) {})
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
};

const gettingTime = () => {
  player
    .getCurrentTime()
    .then(function (seconds) {
      setATime(seconds);
      console.log(seconds);
    })
    .catch(function (error) {});
};

settingTime(getATime);

player.on('timeupdate', throttle(gettingTime, 1000));
