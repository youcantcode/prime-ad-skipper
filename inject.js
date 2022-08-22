
var skipping = false;
var origRate = 1.0;
var origMuted = false;
var isLive = false;
var isAd = false;
var videoPlayer = null;
var recordedPlayer = null;
var adPlayer = null;
var AdUnitView = null;
var player = null;

(function () {
  initalizeWhenReady(window.document);
})();

function initalizeWhenReady(document) {
  window.onload = () => {
    checkDOMChange();
  };
  if (document) {
    if (document.readyState === "complete") {
      checkDOMChange();
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === "complete") {
          checkDOMChange();
        }
      };
    }
  }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkDOMChange() {
    while (true) {
      var playerContainer = document.querySelector('div[class^="rendererContainer"]');
      var adTimeIndicator = document.querySelector('div[class^="atvwebplayersdk-adtimeindicator-text"]');

      if (playerContainer == null) {
      } else {
        player = playerContainer.querySelector('video');
        if (player !== null) {
          if (adTimeIndicator !== null) {
            console.log("There is an ad found!!");
            skipping = true;
            player.muted = true;
            player.playbackRate = 16.0;
            await sleep(75);
          } else {
            skipping = false;
            origMuted = false;
            origRate = player.playbackRate;
            player.muted = false;
            notAnAd();
          }
        }
      }
      await sleep(75);
    }
}


function notAnAd() {
  skipping = false;
  if (player !== null) {
    player.playbackRate = origRate;
    player.muted = false;
    if (player.playbackRate == 16.0) {
      player.playbackRate = 1.0;
    }
  }
}
