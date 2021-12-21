const toggleMenu = document.querySelector('.navbar .toggle-menu');
const menuMoble = document.querySelector('.navbar .navbar__text');

const elePopup = document.querySelector('.popup');
const btnPlayVideo = document.querySelectorAll('.play-video-popup');
const iVideo = document.querySelector('.popup .popup-video');
const eleBackdropPopup = document.querySelector('.popup-backdrop');

const eleAccordions = document.querySelectorAll('.accordion .accordion__item');

const eleHeader = document.querySelector('header');
const eleSections = [...document.querySelectorAll('section')];
const navLink = [...document.querySelectorAll('.nav-link')];

const eleFunfact = document.querySelector('.funfact__list');
const eleFunfactCount = [...document.querySelectorAll('.funfact__count')];
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

// =========== Testermonial video click ============= =
let widthWindow = document.documentElement.clientWidth;
let widthYT = 0;
if (widthWindow > 500) widthYT = Math.round((60 / 100) * widthWindow);
else {
  widthYT = widthWindow - 40;
}
let heightYT = Math.round((widthYT * 390) / 640);
// Load script youtube
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// create iframe youtube
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: heightYT,
    width: widthYT,
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
const stickyMenu = () => {
  if (window.pageYOffset > 80) {
    eleHeader.classList.add('sticky');
  } else {
    eleHeader.classList.remove('sticky');
  }
};
window.addEventListener('scroll', stickyMenu);

// window menu highlight
let options = {
  threshold: 0.6,
};
let firstTime = true;
function callback(entries, observer) {
  if (firstTime) {
    firstTime = false;
    return;
  }
  entries.forEach((entry) => {
    let id = entry.target.id || '-';
    if (id === '-') return;

    navLink.forEach((nav) => {
      nav.classList.remove('active');
    });

    navLink.forEach((nav) => {
      let hrefText = nav.getAttribute('href').split('#').join('');
      if (hrefText == id) {
        nav.classList.add('active');
      }
    });
  });
}
let observer = new IntersectionObserver(callback, options);
eleSections.forEach((sec) => {
  observer.observe(sec);
});

// Count up funfact
let firstTimeCount = true;
const checkScrollFunfact = () => {
  if (window.innerHeight - 150 > eleFunfact.getBoundingClientRect().top) {
    if (!firstTimeCount) {
      return;
    }
    eleFunfactCount.forEach((ele) => {
      let countLoop = 20;
      let count = parseInt(ele.getAttribute('data-count'));
      let start = 0;
      let step = Math.round(count / countLoop);

      const timerCount = setInterval(() => {
        if (start > count) {
          start = count;
          clearTimeout(timerCount);
        }
        ele.innerHTML = start;
        start += step;
      }, 50);
    });
    firstTimeCount = false;
  }
};
window.addEventListener('scroll', checkScrollFunfact);
