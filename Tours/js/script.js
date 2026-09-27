/**
 * PARUL UNIVERSITY - PRACTICAL LEARNING TOURS
 * Interactive JavaScript Controller
 * Smooth Scrolling Cards, Two-Finger Desktop Slide & One-Finger Mobile Touch
 */

document.addEventListener('DOMContentLoaded', () => {
  // Collection of 8 Authentic Parul University Tour Videos with Exact User Embeds
  const toursData = [
    {
      id: 'tour-1',
      tag: 'VADODARA',
      title: 'Campus Virtual Tour',
      year: '2025-26',
      badgeColor: '#008899',
      videoId: 'CoK-vRyucMU',
      embedUrl: 'https://www.youtube.com/embed/CoK-vRyucMU?si=nu63fEl72-k9Vyre',
      heading: 'Virtual Campus Tour',
      subheading: 'Award-Winning Vadodara Campus'
    },
    {
      id: 'tour-2',
      tag: 'BANGALORE',
      title: 'Business Leadership Tour',
      year: '2025',
      badgeColor: '#1A4D80',
      videoId: 'urZTpngOKMU',
      embedUrl: 'https://www.youtube.com/embed/urZTpngOKMU?si=-FBpzlRRdG9E5E_z',
      heading: 'Business Leadership',
      subheading: 'Bangalore Tech & Innovation'
    },
    {
      id: 'tour-3',
      tag: 'MUMBAI',
      title: 'Leadership Tour',
      year: '2025',
      badgeColor: '#0F0445',
      videoId: 'Cy4rIpjHlH8',
      embedUrl: 'https://www.youtube.com/embed/Cy4rIpjHlH8?si=OaEQREfzzvMbPvug',
      heading: 'Mumbai Leadership Tour',
      subheading: 'A Saga of Learning & Legacy'
    },
    {
      id: 'tour-4',
      tag: 'BANGALORE',
      title: 'Enterprise Tour',
      year: '2025',
      badgeColor: '#2A2181',
      videoId: '75mkemYOtcU',
      embedUrl: 'https://www.youtube.com/embed/75mkemYOtcU?si=5GcGbKr5hTzxKvni',
      heading: 'Corporate Innovation',
      subheading: 'Silicon Valley of India'
    },
    {
      id: 'tour-5',
      tag: 'DELHI',
      title: 'National Governance Tour',
      year: '2025',
      badgeColor: '#C2410C',
      videoId: '7OlwbVLLAbI',
      embedUrl: 'https://www.youtube.com/embed/7OlwbVLLAbI?si=YHwvobBif-_fPFSc',
      heading: 'Governance & Diplomacy',
      subheading: 'New Delhi Capital Experience'
    },
    {
      id: 'tour-6',
      tag: 'MUMBAI',
      title: 'Architecture & Design',
      year: '2025',
      badgeColor: '#047857',
      videoId: 'kwSSr-eUis8',
      embedUrl: 'https://www.youtube.com/embed/kwSSr-eUis8?si=I3hS9R0NXyHYwkXn',
      heading: 'Architecture & Design',
      subheading: 'Mumbai Fashion & Lifestyle'
    },
    {
      id: 'tour-7',
      tag: 'MUMBAI',
      title: 'Justice in Journey',
      year: '2025',
      badgeColor: '#6D28D9',
      videoId: 'JDvKTHLaAbs',
      embedUrl: 'https://www.youtube.com/embed/JDvKTHLaAbs?si=cmKIAON94-Driurt',
      heading: 'Justice in Journey',
      subheading: 'High Court & Legal Chambers'
    },
    {
      id: 'tour-8',
      tag: 'DELHI',
      title: 'Civil Servants Tour',
      year: '2025',
      badgeColor: '#B45309',
      videoId: 'f4RvTWOn7M4',
      embedUrl: 'https://www.youtube.com/embed/f4RvTWOn7M4?si=EA64tVVujAE2NymS',
      heading: 'Civil Services Tour',
      subheading: 'Delhi Future Leaders Residency'
    }
  ];

  /**
   * Get YouTube thumbnail URL directly from video ID (always fetched live from
   * YouTube's own image CDN — never a manually uploaded thumbnail asset)
   */
  function getYouTubeThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  let currentTourIndex = 0;
  let isVideoPlaying = false;
  let isTransitioning = false;
  const totalTours = toursData.length;

  // DOM Elements
  const desktopScreenSlider = document.getElementById('desktopScreenSlider');
  const mobileScreenSlider = document.getElementById('mobileScreenSlider');
  const desktopIframe = document.getElementById('desktopIframe');
  const mobileIframe = document.getElementById('mobileIframe');
  const closeVideoDesktop = document.getElementById('closeVideoDesktop');
  const closeVideoMobile = document.getElementById('closeVideoMobile');

  const sideCardLeft = document.getElementById('sideCardLeft');
  const sideCardRight = document.getElementById('sideCardRight');
  const sideCardLeftSlider = document.getElementById('sideCardLeftSlider');
  const sideCardRightSlider = document.getElementById('sideCardRightSlider');
  const puToursStage = document.getElementById('puToursStage');
  const puToursShowcase = document.getElementById('puToursShowcase');
  const deviceCenterWrapper = document.getElementById('deviceCenterWrapper');
  const dotsTrack = document.getElementById('dotsTrack');

  /**
   * Helper to construct video URL with autoplay & API enabled
   */
  function getVideoUrl(tour) {
    const separator = tour.embedUrl.includes('?') ? '&' : '?';
    return `${tour.embedUrl}${separator}autoplay=1&enablejsapi=1&rel=0`;
  }

  /**
   * Build Instagram-style 5-Dot Indicator Track
   */
  function initializeDots() {
    if (!dotsTrack) return;
    dotsTrack.innerHTML = '';

    for (let i = 0; i < totalTours; i++) {
      const dot = document.createElement('button');
      dot.className = 'pu-tours-page-indicator-dot';
      dot.setAttribute('data-index', i);
      dot.setAttribute('aria-label', `Go to ${toursData[i].title}`);

      dot.addEventListener('click', () => {
        if (i !== currentTourIndex) {
          const dir = i > currentTourIndex ? 'next' : 'prev';
          slideToTour(i, dir);
        }
      });

      dotsTrack.appendChild(dot);
    }
    updateDotsUI(currentTourIndex);
  }

  /**
   * Update Instagram-style pagination dots:
   * Exactly 5 visible dots in the window:
   * 1st video -> 1st dot
   * 2nd video -> 2nd dot
   * 3rd video -> 3rd dot
   * videos 4, 5, 6... -> 3rd dot stays active while track translates
   * second-to-last -> 4th dot
   * last -> 5th dot
   */
  function updateDotsUI(activeIndex) {
    if (!dotsTrack) return;
    const dots = dotsTrack.querySelectorAll('.pu-tours-page-indicator-dot');
    if (dots.length === 0) return;

    const visibleCount = 5;
    const dotStep = 16; // 8px dot + 8px gap
    let startIndex = 0;

    if (totalTours <= visibleCount) {
      startIndex = 0;
    } else {
      if (activeIndex <= 2) {
        startIndex = 0;
      } else if (activeIndex >= totalTours - 3) {
        startIndex = totalTours - visibleCount;
      } else {
        startIndex = activeIndex - 2;
      }
    }

    const translateX = -(startIndex * dotStep);
    dotsTrack.style.transform = `translateX(${translateX}px)`;

    dots.forEach((dot, idx) => {
      dot.classList.remove('active', 'dot-small', 'dot-tiny', 'dot-hidden');

      if (idx === activeIndex) {
        dot.classList.add('active');
      } else {
        const distFromWindow = idx - startIndex;
        if (distFromWindow < 0 || distFromWindow >= visibleCount) {
          dot.classList.add('dot-hidden');
        } else if (distFromWindow === 0 && startIndex > 0) {
          dot.classList.add('dot-small');
        } else if (distFromWindow === visibleCount - 1 && startIndex + visibleCount < totalTours) {
          dot.classList.add('dot-small');
        }
      }
    });
  }

  /**
   * Create Desktop Thumbnail Element
   */
  function createDesktopThumbnail(tour) {
    const thumb = document.createElement('div');
    thumb.className = 'pu-tours-page-video-thumbnail-view';
    thumb.style.backgroundImage = `url('${getYouTubeThumbnail(tour.videoId)}')`;

    thumb.innerHTML = `
      <div class="pu-tours-page-play-btn-circle" role="button" aria-label="Play Tour Video">
        <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.4487 18.8018L48.9087 33.5011L23.4487 48.2004L23.4487 18.8018Z" fill="white"/>
        </svg>
      </div>
    `;

    const playBtn = thumb.querySelector('.pu-tours-page-play-btn-circle');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startVideo();
      });
    }

    thumb.addEventListener('click', () => {
      if (!isVideoPlaying) startVideo();
    });

    return thumb;
  }

  /**
   * Create Mobile Thumbnail Element
   */
  function createMobileThumbnail(tour) {
    const thumb = document.createElement('div');
    thumb.className = 'pu-tours-page-mobile-thumbnail-view';
    thumb.style.backgroundImage = `url('${getYouTubeThumbnail(tour.videoId)}')`;

    thumb.innerHTML = `
      <div class="pu-tours-page-play-btn-circle pu-tours-page-play-btn-mobile" role="button" aria-label="Play Tour Video">
        <svg width="40" height="40" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.4487 18.8018L48.9087 33.5011L23.4487 48.2004L23.4487 18.8018Z" fill="white"/>
        </svg>
      </div>
    `;

    const playBtn = thumb.querySelector('.pu-tours-page-play-btn-circle');
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        startVideo();
      });
    }

    thumb.addEventListener('click', () => {
      if (!isVideoPlaying) startVideo();
    });

    return thumb;
  }

  /**
   * Create a Side Card "face" — the sliding layer that holds the thumbnail
   * (always fetched live from YouTube's CDN) + the heading/subheading text.
   * The outer .pu-tours-page-side-card box (shape, tilt, border, shadow)
   * never moves — only this face slides in/out inside it.
   */
  function createSideCardFace(tour) {
    const face = document.createElement('div');
    face.className = 'pu-tours-page-side-card-face';
    face.style.backgroundImage = `url('${getYouTubeThumbnail(tour.videoId)}')`;
    return face;
  }

  /**
   * Set a side card's content instantly (used only on first page load —
   * no animation needed since nothing is on screen yet to slide from).
   */
  function setSideCardImmediate(sliderEl, tour) {
    if (!sliderEl) return;
    sliderEl.innerHTML = '';
    sliderEl.appendChild(createSideCardFace(tour));
  }

  /**
   * Slide a side card's content in the SAME direction as the center screen,
   * using the exact same technique (and timing) as the center video slider,
   * so the left card, the center screen and the right card all swipe as one
   * synchronized motion while each card's own frame/border stays static.
   */
  function slideSideCard(sliderEl, tour, direction) {
    if (!sliderEl) return;
    const currentFace = sliderEl.querySelector('.pu-tours-page-side-card-face');
    const newFace = createSideCardFace(tour);

    newFace.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
    sliderEl.appendChild(newFace);

    // Force Reflow
    void newFace.offsetWidth;

    newFace.style.transform = 'translateX(0)';
    if (currentFace) {
      currentFace.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
      currentFace.style.opacity = '0.4';
    }

    setTimeout(() => {
      if (currentFace && currentFace.parentNode) {
        currentFace.parentNode.removeChild(currentFace);
      }
    }, 500);
  }

  /**
   * Initial Side Card Setup (called once on load)
   */
  function initializeSideCards() {
    const leftIdx = (currentTourIndex - 1 + totalTours) % totalTours;
    const rightIdx = (currentTourIndex + 1) % totalTours;
    setSideCardImmediate(sideCardLeftSlider, toursData[leftIdx]);
    setSideCardImmediate(sideCardRightSlider, toursData[rightIdx]);
  }

  /**
   * Smooth Scrolling / Sliding Transition Between Cards
   * The center screen, the left card and the right card all slide together,
   * in the same direction, at the same time — while every frame (the
   * MacBook/mobile bezel and the side-card borders) stays perfectly static.
   */
  function slideToTour(targetIndex, direction = 'next') {
    if (isTransitioning) return;
    isTransitioning = true;
    stopVideo();

    currentTourIndex = (targetIndex + totalTours) % totalTours;
    const nextTour = toursData[currentTourIndex];
    const leftIdx = (currentTourIndex - 1 + totalTours) % totalTours;
    const rightIdx = (currentTourIndex + 1) % totalTours;

    // Animate Desktop Screen Slider
    if (desktopScreenSlider) {
      const currentThumb = desktopScreenSlider.querySelector('.pu-tours-page-video-thumbnail-view');
      const newThumb = createDesktopThumbnail(nextTour);

      newThumb.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
      desktopScreenSlider.appendChild(newThumb);

      // Force Reflow
      void newThumb.offsetWidth;

      newThumb.style.transform = 'translateX(0)';
      if (currentThumb) {
        currentThumb.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentThumb.style.opacity = '0.4';
      }

      setTimeout(() => {
        if (currentThumb && currentThumb.parentNode) {
          currentThumb.parentNode.removeChild(currentThumb);
        }
      }, 500);
    }

    // Animate Mobile Screen Slider
    if (mobileScreenSlider) {
      const currentMobileThumb = mobileScreenSlider.querySelector('.pu-tours-page-mobile-thumbnail-view');
      const newMobileThumb = createMobileThumbnail(nextTour);

      newMobileThumb.style.transform = direction === 'next' ? 'translateX(100%)' : 'translateX(-100%)';
      mobileScreenSlider.appendChild(newMobileThumb);

      void newMobileThumb.offsetWidth;

      newMobileThumb.style.transform = 'translateX(0)';
      if (currentMobileThumb) {
        currentMobileThumb.style.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
        currentMobileThumb.style.opacity = '0.4';
      }

      setTimeout(() => {
        if (currentMobileThumb && currentMobileThumb.parentNode) {
          currentMobileThumb.parentNode.removeChild(currentMobileThumb);
        }
      }, 500);
    }

    // Slide the left & right cards in the SAME direction, at the SAME moment,
    // as the center screen — one synchronized 3-card swipe. Works identically
    // on mobile since the side cards are shared between the desktop & mobile views.
    slideSideCard(sideCardLeftSlider, toursData[leftIdx], direction);
    slideSideCard(sideCardRightSlider, toursData[rightIdx], direction);

    setTimeout(() => {
      isTransitioning = false;
    }, 500);

    updateDotsUI(currentTourIndex);
  }

  function nextSlide() {
    slideToTour(currentTourIndex + 1, 'next');
  }

  function prevSlide() {
    slideToTour(currentTourIndex - 1, 'prev');
  }

  /**
   * Start video playback in the active device frame
   */
  function startVideo() {
    const tour = toursData[currentTourIndex];
    isVideoPlaying = true;
    const activeUrl = getVideoUrl(tour);

    if (window.innerWidth >= 768) {
      if (desktopIframe) {
        desktopIframe.src = activeUrl;
        desktopIframe.classList.add('active');
        if (closeVideoDesktop) closeVideoDesktop.style.display = 'flex';
      }
    } else {
      if (mobileIframe) {
        mobileIframe.src = activeUrl;
        mobileIframe.classList.add('active');
        if (closeVideoMobile) closeVideoMobile.style.display = 'flex';
      }
    }
  }

  /**
   * Stop video playback and return to thumbnail preview
   */
  function stopVideo() {
    isVideoPlaying = false;
    if (desktopIframe) {
      desktopIframe.src = '';
      desktopIframe.classList.remove('active');
    }
    if (mobileIframe) {
      mobileIframe.src = '';
      mobileIframe.classList.remove('active');
    }
    if (closeVideoDesktop) closeVideoDesktop.style.display = 'none';
    if (closeVideoMobile) closeVideoMobile.style.display = 'none';
  }

  // Close Video Buttons
  if (closeVideoDesktop) {
    closeVideoDesktop.addEventListener('click', (e) => {
      e.stopPropagation();
      stopVideo();
    });
  }

  if (closeVideoMobile) {
    closeVideoMobile.addEventListener('click', (e) => {
      e.stopPropagation();
      stopVideo();
    });
  }

  // Side Cards Click Navigation
  if (sideCardLeft) {
    sideCardLeft.addEventListener('click', () => {
      prevSlide();
    });
  }

  if (sideCardRight) {
    sideCardRight.addEventListener('click', () => {
      nextSlide();
    });
  }

  // --- Two-Finger Desktop Slide (Trackpad Horizontal Wheel) ---
  let wheelCooldown = false;
  let wheelDeltaAccumulator = 0;
  let wheelGestureEndTimer = null;
  const stageTarget = puToursShowcase || puToursStage;

  if (stageTarget) {
    stageTarget.addEventListener('wheel', (e) => {
      // Horizontal slide detection from two-finger touchpad gesture
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
        e.preventDefault();

        // Every wheel tick (including inertia/momentum ticks) postpones the
        // "gesture ended" marker. Only once ticks stop arriving for 200ms do
        // we consider the physical swipe finished and re-arm the trigger.
        clearTimeout(wheelGestureEndTimer);
        wheelGestureEndTimer = setTimeout(() => {
          wheelCooldown = false;
          wheelDeltaAccumulator = 0;
        }, 200);

        if (wheelCooldown || isTransitioning) return;

        wheelDeltaAccumulator += e.deltaX;
        if (Math.abs(wheelDeltaAccumulator) >= 24) {
          if (wheelDeltaAccumulator > 0) {
            nextSlide();
          } else {
            prevSlide();
          }
          // Lock immediately. This lock is only released by the gesture-end
          // timer above, so momentum from the SAME swipe can't trigger again.
          wheelCooldown = true;
          wheelDeltaAccumulator = 0;
        }
      }
    }, { passive: false });
  }
  // --- Interactive Live Drag & One-Finger Mobile Touch ---
  let touchStartX = 0;
  let touchStartY = 0;
  let currentDeltaX = 0;
  let isDragging = false;
  let isTouchAction = false;

  function handleDragStart(clientX, clientY, isTouch) {
    if (isVideoPlaying || isTransitioning) return;
    touchStartX = clientX;
    touchStartY = clientY;
    currentDeltaX = 0;
    isDragging = true;
    isTouchAction = isTouch;

    if (deviceCenterWrapper) deviceCenterWrapper.classList.add('is-dragging');
    if (sideCardLeft) sideCardLeft.classList.add('is-dragging');
    if (sideCardRight) sideCardRight.classList.add('is-dragging');
  }

  function handleDragMove(clientX, clientY) {
    if (!isDragging) return;
    const dx = clientX - touchStartX;
    const dy = clientY - touchStartY;

    if (isTouchAction && Math.abs(dy) > Math.abs(dx) * 1.5 && Math.abs(dx) < 15) {
      return; // Natural vertical scroll
    }

    currentDeltaX = dx;

    // Real-time smooth drag response — ALL 3 cards move together
    const dragRatio = 0.35;
    const dragPx = currentDeltaX * dragRatio;
    if (deviceCenterWrapper) {
      deviceCenterWrapper.style.transform = `translateX(${dragPx}px)`;
    }
    // Move side cards in sync via CSS custom property
    if (sideCardLeft) {
      sideCardLeft.style.setProperty('--drag-offset', `${dragPx}px`);
    }
    if (sideCardRight) {
      sideCardRight.style.setProperty('--drag-offset', `${dragPx}px`);
    }
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    if (deviceCenterWrapper) {
      deviceCenterWrapper.classList.remove('is-dragging');
      deviceCenterWrapper.style.transform = '';
    }
    if (sideCardLeft) {
      sideCardLeft.classList.remove('is-dragging');
      sideCardLeft.style.removeProperty('--drag-offset');
    }
    if (sideCardRight) {
      sideCardRight.classList.remove('is-dragging');
      sideCardRight.style.removeProperty('--drag-offset');
    }

    if (Math.abs(currentDeltaX) > 35) {
      if (currentDeltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    currentDeltaX = 0;
  }

  if (stageTarget) {
    // Touch Events (Mobile)
    stageTarget.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        handleDragStart(e.touches[0].clientX, e.touches[0].clientY, true);
      }
    }, { passive: true });

    stageTarget.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    stageTarget.addEventListener('touchend', () => {
      handleDragEnd();
    });

    stageTarget.addEventListener('touchcancel', () => {
      handleDragEnd();
    });

    // Mouse Drag Events (Desktop)
    stageTarget.addEventListener('mousedown', (e) => {
      if (e.target.closest('.pu-tours-page-play-btn-circle, .pu-tours-page-btn-close-video')) return;
      handleDragStart(e.clientX, e.clientY, false);
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging && !isTouchAction) {
        handleDragMove(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDragging && !isTouchAction) {
        handleDragEnd();
      }
    });
  }

  // Keyboard accessibility
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isVideoPlaying) {
      stopVideo();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      prevSlide();
    }
  });

  // Initial Setup
  initializeDots();
  initializeSideCards();

  // Attach initial click listeners to default thumbnail play buttons
  const initDesktopPlay = document.getElementById('playButtonDesktop');
  const initDesktopThumb = document.getElementById('desktopThumbnail');
  if (initDesktopPlay) {
    initDesktopPlay.addEventListener('click', (e) => {
      e.stopPropagation();
      startVideo();
    });
  }
  if (initDesktopThumb) {
    initDesktopThumb.addEventListener('click', () => {
      if (!isVideoPlaying) startVideo();
    });
  }

  const initMobilePlay = document.getElementById('playButtonMobile');
  const initMobileThumb = document.getElementById('mobileThumbnail');
  if (initMobilePlay) {
    initMobilePlay.addEventListener('click', (e) => {
      e.stopPropagation();
      startVideo();
    });
  }
  if (initMobileThumb) {
    initMobileThumb.addEventListener('click', () => {
      if (!isVideoPlaying) startVideo();
    });
  }
});