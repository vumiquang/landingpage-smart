const toggleMenu = document.querySelector('.navbar .toggle-menu');
const menuMoble = document.querySelector('.navbar .navbar__text');

const elePopup = document.querySelector('.popup');
const btnPlayVideo = document.querySelectorAll('.play-video-popup');
const iVideo = document.querySelector('.popup .popup-video');
const eleBackdropPopup = document.querySelector('.popup-backdrop');

const eleAccordions = document.querySelectorAll('.accordion .accordion__item');

const eleHeader = document.querySelector('header');
//===========   Toggle menu ============
toggleMenu.onclick = () => {
  if (menuMoble.classList.contains('active')) {
    menuMoble.classList.remove('active');
    menuMoble.style.maxHeight = '0';
  } else {
    menuMoble.classList.add('active');
    menuMoble.style.maxHeight = menuMoble.scrollHeight + 'px';
  }
};

// =========== Testermonial video click =============
// Load script youtube
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// create iframe youtube
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}
function onPlayerReady(event) {
  event.target.playVideo();
}
//  The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

btnPlayVideo.forEach((btn) => {
  btn.onclick = function () {
    const btnClosePopup = document.createElement('i');
    btnClosePopup.classList.add('bi', 'bi-x', 'popup-close');
    btnClosePopup.onclick = function () {
      elePopup.classList.add('hidden');
      stopVideo();
    };

    let idVideo = btn.getAttribute('data-video');
    console.log(idVideo);

    player.loadVideoById(idVideo, 0);

    iVideo.appendChild(btnClosePopup);
    elePopup.classList.remove('hidden');
  };
});

//===========   Backdrop popup ============
eleBackdropPopup.onclick = () => {
  elePopup.classList.add('hidden');
  stopVideo();
};

// ====== Accordion How it work ===========
function resetAccordion() {
  eleAccordions.forEach((ele) => {
    ele.classList.remove('active');
    let accBody = ele.querySelector('.accordion__body');
    accBody.style.maxHeight = '0';
  });
}

eleAccordions.forEach((ele) => {
  ele.onclick = () => {
    if (!ele.classList.contains('active')) {
      resetAccordion();
      ele.classList.add('active');
      let bodyHeight = ele.querySelector('.accordion__body p');
      let accBody = ele.querySelector('.accordion__body');
      accBody.style.maxHeight = bodyHeight.clientHeight + 'px';
    } else {
      resetAccordion();
    }
  };
});

// Sticky header
window.onscroll = () => {
  if (window.pageYOffset > 80) {
    eleHeader.classList.add('sticky');
  } else {
    eleHeader.classList.remove('sticky');
  }
};
